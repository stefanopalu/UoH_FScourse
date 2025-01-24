import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'

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
  }

  const createBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: blogUrl
    }

    blogService
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogsBefore => [...blogsBefore, returnedBlog])
      setTitle('')
      setAuthor('')
      setBlogUrl('')
    })
  }

  const addNote = (event) => {
      event.preventDefault()
      const noteObject = {
        content: newNote,
        important: Math.random() <0.5,
      }
  
      noteService
        .create(noteObject)
        .then(returnedNote => {
          setNotes(notes.concat(returnedNote))
          setNewNote('')
        })
    }

  return (
    <div>
      {user === null ? (
      <div>
        <h2>Log in to application</h2>
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
        {user.name} logged in
        <button onClick={() => {
          setUser(null)
          window.localStorage.removeItem('loggedNoteappUser')
          }}>
          logout
        </button>
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
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
      )}
    </div>
  )
}

export default App