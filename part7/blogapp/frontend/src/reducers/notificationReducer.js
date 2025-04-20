import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
      sendNotification(state, action){
        return action.payload
      },
      clearNotification(state,action){
        return null
      }
    }  
  })
  
  export const { sendNotification, clearNotification } = notificationSlice.actions

  export const setNotification = ( content, time) => {
    return async dispatch => {
      dispatch(sendNotification(content))
      setTimeout(() => {
        dispatch(clearNotification())
      }, time * 1000)
    }
  }

  export default notificationSlice.reducer