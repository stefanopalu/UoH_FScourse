import { useEffect, useState } from 'react'
import { Entry, NewEntry } from './types'
import axios from 'axios';
import EntriesList from './components/EntriesList'
import NewEntryForm from './components/NewEntryForm';

function App() {
  const [entries, setEntries] = useState<Entry[]>([])

  useEffect(() => {
    axios.get('http://localhost:3000/api/diaries').then(response => {
      setEntries(response.data)
    })
  }, []);

  const handleNewEntry = (newEntry: NewEntry) => {
    axios.post<Entry>('http://localhost:3000/api/diaries', newEntry )
      .then(response => {
        setEntries(entries.concat(response.data))
      })
  }

  return (
    <div>
      <h1>Add new entry</h1>
      <NewEntryForm onEntryCreate={handleNewEntry}/>

      <h1>Diary entries</h1>
      <EntriesList entries={entries}/>
    </div>
  )
}

export default App
