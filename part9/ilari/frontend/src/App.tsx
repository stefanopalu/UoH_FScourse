import { useEffect, useState } from 'react'
import { Entry, NewEntry } from './types'
import axios, { AxiosError } from 'axios';
import EntriesList from './components/EntriesList'
import NewEntryForm from './components/NewEntryForm';

function App() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    axios.get('http://localhost:3000/api/diaries').then(response => {
      setEntries(response.data)
    })
  }, []);

  const handleNewEntry = async (newEntry: NewEntry) => {
    try {
      const response = await axios.post<Entry>('http://localhost:3000/api/diaries', newEntry )
      setEntries(entries.concat(response.data));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const message = error.response.data?.message || "Something went wrong with the server"; 
        setErrorMessage(message);
      } else {
        setErrorMessage("Unexpected error occurred"); // Catch unexpected errors
      }
    }
  }

  return (
    <div>
      <h1>Add new entry</h1>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <NewEntryForm onEntryCreate={handleNewEntry}/>

      <h1>Diary entries</h1>
      <EntriesList entries={entries}/>
    </div>
  )
}

export default App
