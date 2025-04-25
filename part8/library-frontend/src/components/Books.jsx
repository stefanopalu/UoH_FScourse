import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [filter, setFilter] = useState(null)
  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  const bookGenres = [...new Set(books.flatMap(book => book.genres))]
  const handleFilter = (genre) => {
    setFilter(genre)
  }
  
  const filteredBooks = filter
    ? books.filter(book => book.genres.includes(filter))
    : books
  
  return (
    <div>
      <h2>books</h2>
      {filter && <p>in genre {filter}</p>}
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
      <div>
      {bookGenres.map((genre, index) => (
            <button key={index} onClick={() =>handleFilter(genre)}>{genre}</button>
          ))}
      <button onClick={() => setFilter(null)}>All Genres</button>
      </div>
    </div>
  )
}

export default Books
