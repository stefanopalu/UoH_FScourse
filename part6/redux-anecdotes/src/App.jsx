import { useSelector, useDispatch } from 'react-redux'
import { addVote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

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