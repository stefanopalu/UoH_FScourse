import { useState, useEffect } from 'react'
import axios from 'axios'
import { Filter } from './components/filter'
import { Country } from './components/country'


function App() {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')


  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleNewSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const countriesToShow = newSearch
    ? countries.filter(country => country.name.common.toLowerCase().includes(newSearch.toLowerCase()))
    : countries

  return (
  <div>
    <Filter value={newSearch} onChange={handleNewSearch}/>
    <div>
      {countriesToShow.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countriesToShow.length > 1 ? (
        countriesToShow.map(country => (
          <p key={country.cca2}>{country.name.common}</p>
        ))
      ) : countriesToShow.length === 1 ? (
        countriesToShow.map(country => (
          <Country country={country}/>
        ))
      ) : null}
    </div>
  </div>
  )
}

export default App
