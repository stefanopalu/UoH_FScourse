import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux'
import BlogList from "./components/BlogList"
import Users from "./components/Users"
import LoginForm from "./components/LoginForm";
import { Notification } from "./components/Notification";
import { ErrorMessage } from "./components/errormessage";
import { setNotification } from "./reducers/notificationReducer";
import blogService from "./services/blogs";
import { initialiseBlogs, createBlog, deleteBlog } from "./reducers/blogsReducer";
import loginService from "./services/login";
import { storeUser } from "./reducers/userReducer"

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

  return (
    <Router>
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
          <Notification message={notification} />
          {user.name} logged in
          <button
            onClick={() => {
              dispatch(storeUser(null));
              window.localStorage.removeItem("loggedNoteappUser");
            }}
          >
            logout
          </button>
          <Routes>
            <Route path="/users" element={<Users />} />
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
                  user={user}
                  blogFormRef={blogFormRef}
                />
              }/>
            </Routes>
        </div>
      )}
    </div>
    </Router>
  );
};

export default App;