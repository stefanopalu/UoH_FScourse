import { createContext, useReducer } from 'react'

const initialState = {
    message: null,
    blog: null
  }
  
  const notificationReducer = (state, action) => {
    switch (action.type) {
      case "NEW":
        return {message: `new blog ${action.blog.title} by ${action.blog.author} added`, blog: action.blog}
      case "CLEAR":
        return {message: null, anecdote: null}
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