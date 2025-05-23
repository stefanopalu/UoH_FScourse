import { useState, useEffect } from 'react'
import axios from 'axios'
import { Person } from './components/persons'
import { Filter } from './components/filter'
import { PersonForm } from './components/personform'
import { Notification } from './components/notification'
import { ErrorMessage } from './components/errormessage'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


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
    const oldPerson = persons.find(person => person.name === newName)

  if (oldPerson) {
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
      console.log(newNumber)
      console.log(oldPerson.id)
      changeNumber({ person: oldPerson, updatedNumber: newNumber })
      setNewName("")
      setNewNumber("")
    }
  } else {
    personService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNotificationMessage(`Added ${newPerson.name}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        setNewName("")
        setNewNumber("")
        console.log("added")
      })
      .catch(error => {
        console.log(error.response.data.error)
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      })
  }
}

  const deletePersonFrom = (id, person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deleteFrom(id)
        .then(response => {
          setNotificationMessage(`${person.name} deleted`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  const changeNumber = ({person, updatedNumber}) => {
    const personChangedNumber = { ...person, number: updatedNumber }

    personService
      .updateNumber(person.id, personChangedNumber)
      .then(response => {
        setPersons(persons.map(p => p.id === person.id ? response.data : p))
        setNotificationMessage(`Number changed for ${person.name}. The new number is ${newNumber}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log('Error:', error);
        console.log('fail')
        setErrorMessage(`Information of ${person.name} has already been deleted from the server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
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
      <Notification message={notificationMessage} />
      <ErrorMessage message={errorMessage} />
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