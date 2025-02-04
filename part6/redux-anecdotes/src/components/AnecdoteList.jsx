import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { sendNotification, clearNotification } from '../reducers/notificationReducer'


const Anecdote = ({anecdote, handleClick }) => {
  return(
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if (state.filter === 'ALL') {
      return state.anecdotes
    }
    return state.anecdotes.filter (a =>
      a.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  })
  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(sendNotification(`you voted "${anecdote.content}" ` ))
        setTimeout(() => {
          dispatch(clearNotification())
        }, 5000)
  }

  return(
    <div>
      {[...anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <Anecdote
            key = {anecdote.id}
            anecdote={anecdote}
            
            handleClick={() => handleVote(anecdote)}
          />
      )}
    </div>
  )
}

export default Anecdotes