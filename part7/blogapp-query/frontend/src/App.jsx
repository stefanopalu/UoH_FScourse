import { useState, useEffect, useRef, useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import { Notification } from './components/Notification'
import { ErrorMessage } from './components/errormessage'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import NotificationContext from './NotificationContext'
import UserContext from './UserContext'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const [notification, notificationDispatch] = useContext(NotificationContext)
  const [state, userDispatch] = useContext(UserContext)
  const user = state.user
  const queryClient = useQueryClient()

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (returnedBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notificationDispatch({
        type: 'NEW',
        blog: returnedBlog
      })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000)
    }
  })

  const deleteBlogMutation = useMutation({
    mutationFn: (id) => blogService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })

  const voteBlogMutation = useMutation({
    mutationFn: ({ id, blogObject }) => blogService.update(id, blogObject),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  })

  const blogs = result.data
  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      userDispatch({
        type: 'LOGIN',
        username: user.username,
        userId: user.id,
      })
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const createBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    newBlogMutation.mutate(blogObject)
  }

  const deleteBlog = (blogObject) => {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
      deleteBlogMutation.mutate(blogObject.id)
    }
  }

  const voteBlog = (id, blogObject) => {
    voteBlogMutation.mutate({ id, blogObject })
  }

  const sortedBlogs = (blogs || []).sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          <ErrorMessage message={errorMessage} />
          <LoginForm
            username={username}
            password={password}
            handleLogin={handleLogin}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          {notification.message && <Notification message={notification.message} />}
          {user.name} logged in
          <button onClick={() => {
            userDispatch({type: 'LOGOUT'})
            window.localStorage.removeItem('loggedNoteappUser')
            blogService.setToken(null)
          }}>
            logout
          </button>
          <Togglable showButtonLabel='new note' hideButtonLabel='cancel' ref={blogFormRef}>
            <h2>create new</h2>
            <NewBlogForm
              title={title}
              author={author}
              blogUrl={blogUrl}
              createBlog={createBlog}
              setTitle={setTitle}
              setAuthor={setAuthor}
              setBlogUrl={setBlogUrl}
            />
          </Togglable>
          {sortedBlogs.map(blog =>
            <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} voteBlog={voteBlog} user={user} />
          )}
        </div>
      )}
    </div>
  )
}

export default App