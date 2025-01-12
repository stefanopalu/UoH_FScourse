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
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
      const person = persons.find(person => person.name === newName)
      console.log(newNumber)
      console.log(person.id)
      changeNumber({ id: person.id, updatedNumber: newNumber })
    }
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

  const changeNumber = ({id, updatedNumber}) => {
    const url = `http://localhost:3001/persons/${id}`
    const personToChange = persons.find(person => person.id === id)
    const personChangedNumber = { ...personToChange, number: updatedNumber }

    personService
      .updateNumber(url, personChangedNumber)
      .then(response => {
        setPersons(persons.map(person => person.id === id ? response.data : person))
    })
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