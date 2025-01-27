import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import { Notification } from './components/Notification'
import { ErrorMessage } from './components/errormessage'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
 

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login ({
          username, password
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
  
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(error) {
      setErrorMessage('wrong username or password')
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
    }
  }

  const createBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogsBefore => [...blogsBefore, returnedBlog])
      setNotificationMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added` )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
    })
  }

  const blogFormRef = useRef()

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
        <Notification message={notificationMessage} />
        {user.name} logged in
        <button onClick={() => {
          setUser(null)
          window.localStorage.removeItem('loggedNoteappUser')
          }}>
          logout
        </button>
        <Togglable showButtonLabel='new note' hideButtonLabel='cancel'ref={blogFormRef}>
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
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
      )}
    </div>
  )
}

export default App