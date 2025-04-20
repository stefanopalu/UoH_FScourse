import { createContext, useReducer, useEffect } from 'react'
import blogService from './services/blogs'

const initialState = {
    user: null,
  }
  
const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: {username: action.username, userId: action.userId }};
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [ state, userDispatch ] = useReducer(userReducer, initialState)

  useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        userDispatch({
            type: 'LOGIN',
            username: user.username,
            userId: user.id,
        })
        blogService.setToken(user.token)
      }
    }, [])

  return (
   <UserContext.Provider value={[state, userDispatch]}>
     {props.children}
   </UserContext.Provider>
  )
}

export default UserContext