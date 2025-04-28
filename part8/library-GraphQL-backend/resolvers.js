const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const resolvers = {
    Query: {
      bookCount: async () => Book.collection.countDocuments(),
      authorCount: async () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
        if (!args.author && !args.genre) {
          return Book.find()
        }
        if (args.author && !args.genre) {
          let author = await Author.findOne({name: args.author})
          return Book.find({ author: author._id })
        }
        if (args.genre && !args.author) {
          return Book.find({genres: args.genre})
        }
        const author = await Author.findOne({ name: args.author })
        return Book.find({ 
          author: author._id,
          genres: args.genre
        })
        },
      allAuthors: async (root, args) => {
        return Author.find({})
      },
      me: (root, args, context) => {
        return context.currentUser
      }
    },
    Book: {
      author: async (root) => {
        return await Author.findById(root.author)
      }
    },
    Author: {
      bookCount: async (author) => {
         return Book.countDocuments({author: author._id})
      }
    },
    Mutation: {
      addBook: async (root, args, context) => {
        const currentUser = context.currentUser
  
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
  
        if (args.author.length < 3 || args.title.length < 2) {
          throw new GraphQLError('Author name or title is too short', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: {
                author: args.author,
                title: args.title
              },
              reason: 'Author name or title is too short'
            }
          })
        }
        let author = await Author.findOne({name: args.author})
  
        if (!author) {
          author = new Author({
            name: args.author,
            born: null
          })
          try {
            await author.save()
          } catch (error) {
            throw new GraphQLError('Saving author failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.name,
                error
              }
            })
          }
        }
        const book = new Book({
          title: args.title,
          published: args.published,
          author: author._id,
          genres: args.genres
        })
  
        try {
          await book.save()
        } catch (error) {
          throw new GraphQLError('Saving book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error
            }
          })
        }
        pubsub.publish('BOOK_ADDED', { bookAdded: book })

        return book
      },
      editAuthor: async (root, args, context) =>{
        const currentUser = context.currentUser
  
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
  
        let author = await Author.findOne({name: args.name})
        if (!author) {
          return null
        }
  
        author.born = args.setBornTo
        return author.save()
      },
      createUser: async (root, args) => {
        const user = new User({ 
          username: args.username,
          favoriteGenre: args.favoriteGenre
        })
  
        return user.save()
          .catch(error =>{
            throw new GraphQLError('Creating user failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.username,
                error
              }
            })
          })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
  
        if (!user || args.password !== 'password') {
          throw new GraphQLError('wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })
        }
  
        const userForToken = {
          username: user.username,
          id: user._id,
        }
  
        return { 
          value: jwt.sign(userForToken, process.env.JWT_SECRET), 
          user: {
            username: user.username,
            favoriteGenre: user.favoriteGenre
          }
        }
      }
    },
  }

  module.exports = resolvers