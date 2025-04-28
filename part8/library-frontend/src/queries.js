import { gql } from '@apollo/client'


const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    author {
     name
    }
    id
    genres
  }
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
    id
  }
}
`
export const ALL_BOOKS = gql`
query allBooks($genre: String) {
  allBooks(genre: $genre) {
    title
    published
    author {
     name
    }
    genres
    id
  }
}
`

export const ADD_BOOK = gql`
mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres
  ) {
    title
    published
    author {
      name
    }
    genres
    id
  }
}
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
      user {
        username
        favoriteGenre
      }
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  
${BOOK_DETAILS}
`