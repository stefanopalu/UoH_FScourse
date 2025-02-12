import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        storeUser(state,action) {
           return action.payload
        }
    }
})

export const { storeUser } = userSlice.actions


export default userSlice.reducer
