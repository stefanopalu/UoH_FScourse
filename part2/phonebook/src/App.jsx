import { useState, useEffect } from 'react'
import axios from 'axios'
import { Person } from './components/persons'
import { Filter } from './components/filter'
import { PersonForm } from './components/personform'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState("")

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }

  if (persons.some(person => person.name === newName)) {
    console.log("already in list")
    alert(`${newName} is already added to phonebook`)
    } else {
      personService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName("")
          setNewNumber("")
          console.log("added")
        })
    }
  }

  const deletePersonFrom = (id, person) => {

    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deleteFrom(id)
        .then(response => {
          console.log(response.data),
          setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleNewSearch = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  const personsToShow = newSearch
    ? persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newSearch} onChange={handleNewSearch}/>
      <h2>Add a new</h2>
      <PersonForm onSubmit={addPerson} name={newName} nameChange={handleNewName} number={newNumber} numberChange={handleNewNumber}/>
      <h2>Numbers</h2>
      <div>
        {personsToShow.map(person => 
          <Person
            key={person.id}
            person={person}
            deletePerson={() => deletePersonFrom(person.id, person)}
          />
        )}
      </div>
    </div>
  )
}

export default App