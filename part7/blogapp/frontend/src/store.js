import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'


const store = configureStore({
  reducer: {
    user : userReducer,
    blogs : blogsReducer,
    notification: notificationReducer
  }
})

console.log(store.getState())

export default store