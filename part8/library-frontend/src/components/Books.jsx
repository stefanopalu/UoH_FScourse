import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [filter, setFilter] = useState(null)
  const [allGenres, setAllGenres] = useState([])
  
  const {loading, data} = useQuery(ALL_BOOKS, {
    variables: {genre: filter}
  })
  
  useEffect(() => {
    if (data && allGenres.length === 0) {
      const genres = [...new Set(data.allBooks.flatMap(book => book.genres))]
      setAllGenres(genres)
    }
  }, [data])

  if (!props.show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }

  const books = data.allBooks
  
  const handleFilter = (genre) => {
    setFilter(genre)
  }
    
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
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      {allGenres.map((genre, index) => (
          <button key={index} onClick={() => handleFilter(genre)}>{genre}</button>
        ))}
      <button onClick={() => handleFilter(null)}>All Genres</button>
      </div>
    </div>
  )
}

export default Books