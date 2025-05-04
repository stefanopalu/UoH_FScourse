import { useEffect, useState } from 'react'
import { Entry } from './types'
import axios from 'axios';
import  EntriesList from './components/EntriesList'

function App() {
  const [entries, setEntries] = useState<Entry[]>([])

  useEffect(() => {
    axios.get('http://localhost:3000/api/diaries').then(response => {
      setEntries(response.data)
    })
  }, []);

  return (
    <div>
      <h1>Diary entries</h1>
      <EntriesList entries={entries}/>
    </div>
  )
}

export default App
