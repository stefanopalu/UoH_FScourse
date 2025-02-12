import { createSlice } from "@reduxjs/toolkit"
import blogsService from '../services/blogs'

const blogsSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        appendBlog(state,action) {
            state.push(action.payload)
        },
        setBlogs(state,action){
            return action.payload
        }
    }
})

export const { appendBlog, setBlogs } = blogsSlice.actions

export const initialiseBlogs = () => {
    return async dispatch => {
        const blogs = await blogsService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = content => {
    return async dispatch => {
        const newBlog = await blogsService.create(content)
        dispatch(appendBlog(newBlog))
    }
}

export default blogsSlice.reducer
