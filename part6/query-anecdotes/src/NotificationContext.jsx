import { createContext, useReducer } from 'react'

const initialState = {
    message: '',
    anecdote: null
  }
  
  const notificationReducer = (state, action) => {
    switch (action.type) {
      case "NEW":
        return {message: `anecdote ${action.anecdote.content} added`, anecdote: action.anecdote}
      case "VOTE":
        return {message: `anecdote ${action.anecdote.content} voted`, anecdote: action.anecdote}
      case "CLEAR":
        return {message: '', anecdote: null}
      default: 
        return initialState
    }
  }

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [ notification, notificationDispatch ] = useReducer(notificationReducer, initialState)

  return (
   <NotificationContext.Provider value={[notification, notificationDispatch]}>
     {props.children}
   </NotificationContext.Provider>
  )
}

export default NotificationContext