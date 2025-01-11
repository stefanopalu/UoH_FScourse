import { useState } from 'react'
import { Person } from './components/persons'
import { Filter } from './components/filter'
import { PersonForm } from './components/personform'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState("")

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

  if (persons.some(person => person.name === newName)) {
    console.log("already in list")
    alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
      setNewName("")
      setNewNumber("")
      console.log("added")
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
        {personsToShow.map(person => <Person key={person.id} person={person}/>)}
      </div>
    </div>
  )
}

export default App