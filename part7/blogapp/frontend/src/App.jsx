import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux'
import BlogList from "./components/BlogList"
import Users from "./components/Users"
import User from "./components/User"
import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm";
import { Notification } from "./components/Notification";
import { ErrorMessage } from "./components/errormessage";
import { setNotification } from "./reducers/notificationReducer";
import blogService from "./services/blogs";
import { initialiseBlogs, createBlog, deleteBlog } from "./reducers/blogsReducer";
import { initialiseUsers } from './reducers/usersReducer'
import loginService from "./services/login";
import { storeUser } from "./reducers/userReducer"
import { Navbar, Nav, Button, Container } from 'react-bootstrap';

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialiseBlogs());
  }, [dispatch]);

  const users = useSelector(state => state.users)

useEffect(() => {
  dispatch(initialiseUsers());
}, [dispatch]);

  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(storeUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      dispatch(storeUser(user));
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrorMessage("wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleCreateBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(blogObject))
    console.log("blog added")
    dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`,5 ))
  };

  const handleDeleteBlog = (blogObject) => {
    console.log(blogObject)
    if (
      window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)
    ) {
      dispatch(deleteBlog(blogObject.id))
    }
  };

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  const blogFormRef = useRef();

  const padding = {
    padding: 5
  }

  return (
    <Router>
    <Container>
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
          <Navbar>
            <Container>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">blogs</Nav.Link>
                <Nav.Link as={Link} to="/users">users</Nav.Link>
              </Nav>
              <Navbar.Text className="me-2">
                {user.name} logged in
              </Navbar.Text>
              <Button variant="outline-secondary" size="sm"
                onClick={() => {
                  dispatch(storeUser(null));
                  window.localStorage.removeItem("loggedNoteappUser");
                }}>
                Logout
              </Button>
            
            </Container>
          </Navbar>
          <Notification message={notification} />
          <h1 className='my-3'>Blog app</h1>
          <Routes>
            <Route path="/users" element={<Users users={users}/>} />
            <Route path="/users/:id" element={<User users={users}/>} />
            <Route path="/blogs/:id" element={<Blog user={user} deleteBlog={handleDeleteBlog}/>} />
            <Route path="/" element={
                <BlogList
                  title={title}
                  author={author}
                  blogUrl={blogUrl}
                  setTitle={setTitle}
                  setAuthor={setAuthor}
                  setBlogUrl={setBlogUrl}
                  createBlog={handleCreateBlog}
                  deleteBlog={handleDeleteBlog}
                  sortedBlogs={sortedBlogs}
                  blogs={blogs}
                  user={user}
                  blogFormRef={blogFormRef}
                />
              }/>
            </Routes>
        </div>
      )}
    </Container>
    </Router>
  );
};

export default App;