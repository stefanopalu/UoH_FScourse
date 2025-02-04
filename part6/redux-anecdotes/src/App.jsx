import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote, setAnecdotes } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'
import anecdotes from './services/anecdotes'

const App = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService
    .getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  })

  const vote = (id) => {
    dispatch(addVote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification message={notification} />
      <Filter />
      <Anecdotes />
      <AnecdoteForm /> 
    </div>
  )
}

export default App