import { useState, useEffect } from 'react'
import axios from 'axios'
import { Filter } from './components/filter'
import { Country } from './components/country'


function App() {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [countryCapital, setCountryCapital] = useState('')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    if (countryCapital) {
      const api_key = import.meta.env.VITE_SOME_KEY
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${countryCapital}&appid=${api_key}`)
        .then(response => {
          console.log("Weather data:", response.data)
          setWeather(response.data);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
    }
  }, [countryCapital])

  const handleNewSearch = (event) => {
    setNewSearch(event.target.value)
    setWeather(null)
  
    const countriesToShow = countries.filter(country =>
      country.name.common.toLowerCase().includes(event.target.value.toLowerCase())
    );
  
    if (countriesToShow.length === 1) {
      setCountryCapital(countriesToShow[0].capital)
    } else {
      setCountryCapital(''); 
    }
  };

  const showCountry = (country) => {
    setNewSearch(country.name.common)
    setCountryCapital(country.capital)
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
              <div key={country.cca2}>
                <p>{country.name.common}</p>
                <button onClick={() => showCountry(country)}> show</button>
              </div>
            ))
          ) : countriesToShow.length === 1 ? (
              <Country country={countriesToShow[0]}/>
          ) : null}
        </div>
        {weather && (
        <div>
          <p>temperature {weather.main.temp}°C</p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
          <p>wind {weather.wind.speed} m/s</p>
        </div>
        )}
      </div>
    )
}

export default App
