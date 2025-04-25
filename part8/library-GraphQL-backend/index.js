const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

  const typeDefs = `
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]
  }

  type Mutation {
    addBook(
        title: String!
        published: Int!
        author: String!
        genres: [String!]!
    ): Book
    editAuthor(
        name: String!
        setBornTo: Int!
    ) : Author
  }
`

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
    addBook: async (root, args) => {
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

      return book
    },
    editAuthor: async (root, args) =>{
      let author = await Author.findOne({name: args.name})
      if (!author) {
        return null
      }

      author.born = args.setBornTo
      return author.save()
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})