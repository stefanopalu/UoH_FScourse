import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const id = action.payload.id
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : action.payload
      ) 
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addVote, appendAnecdote, setAnecdotes } = anecdotesSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = content => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.addVote(content)
    dispatch(addVote(updatedAnecdote))
  }
}

export default anecdotesSlice.reducer
