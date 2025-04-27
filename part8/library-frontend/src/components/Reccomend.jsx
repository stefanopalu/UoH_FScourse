import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS } from '../queries'


const Reccomend = ({show, user }) => {
  const result = useQuery(ALL_BOOKS)

  if (!show) return null;

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  const filteredBooks = books.filter(book => book.genres.includes(user.favoriteGenre))

  console.log(filteredBooks)
  return (
    <div>
      <h2>reccomendations</h2>
      <p>books in your favorite genre {user.favoriteGenre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Reccomend