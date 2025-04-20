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
        },
        removeBlog(state,action) {
            return state.filter(blog => blog.id !== action.payload.id)
        }
    }
})

export const { appendBlog, setBlogs, removeBlog } = blogsSlice.actions

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

export const deleteBlog = content => {
    console.log(content)
    return async dispatch => {
      await blogsService.remove(content)
      dispatch(removeBlog(content))
      dispatch(setBlogs(await blogsService.getAll()))
    }
}

  export const voteBlog = content => {
    return async dispatch => {
      const updatedBlog = {...content, likes: content.likes +1}
      await blogsService.update(content.id, updatedBlog)
      dispatch(setBlogs(await blogsService.getAll()))
    }
  }

  export const commentBlog = (id, comment) => {
    return async dispatch => {
      await blogsService.comment(id, comment)
      dispatch(setBlogs(await blogsService.getAll()))
    }
  }

export default blogsSlice.reducer
