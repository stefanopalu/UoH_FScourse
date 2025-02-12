import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import { Notification } from "./components/Notification";
import { ErrorMessage } from "./components/errormessage";
import { setNotification } from "./reducers/notificationReducer";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import { initialiseBlogs, createBlog } from "./reducers/blogsReducer";
import loginService from "./services/login";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialiseBlogs());
  }, [dispatch]);

  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
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
      setUser(user);
      setUsername("");
      setPassword("");
      console.log("User object after login:", user);
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

  const deleteBlog = (blogObject) => {
    if (
      window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)
    ) {
      blogService.remove(blogObject.id).then(() => {
        setBlogs(blogs.filter((blog) => blogObject.id !== blog.id));
      });
    }
  };

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  const blogFormRef = useRef();

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
          <Notification message={notification} />
          {user.name} logged in
          <button
            onClick={() => {
              setUser(null);
              window.localStorage.removeItem("loggedNoteappUser");
            }}
          >
            logout
          </button>
          <Togglable
            showButtonLabel="new blog"
            hideButtonLabel="cancel"
            ref={blogFormRef}
          >
            <h2>create new</h2>
            <NewBlogForm
              title={title}
              author={author}
              blogUrl={blogUrl}
              createBlog={handleCreateBlog}
              setTitle={setTitle}
              setAuthor={setAuthor}
              setBlogUrl={setBlogUrl}
            />
          </Togglable>
          {sortedBlogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              deleteBlog={deleteBlog}
              user={user}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
