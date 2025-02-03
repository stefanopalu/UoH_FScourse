import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'Initial notification',
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
  export default notificationSlice.reducer