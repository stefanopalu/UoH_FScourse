import Togglable from "./Togglable";
import PropTypes from "prop-types";
import { useDispatch } from 'react-redux'
import { voteBlog } from "../reducers/blogsReducer";


const Blog = ({ blog, setBlogs, deleteBlog, user }) => {
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const addLike = (blog) => {
    dispatch(voteBlog(blog))
  };

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}
      </div>
      <Togglable showButtonLabel="view" hideButtonLabel="hide">
        <div>{blog.url}</div>
        <div>
          {blog.likes} <button onClick={() => addLike(blog)}>like</button>
        </div>
        <div>{blog.user.name}</div>
      </Togglable>
      {user.id === blog.user.id && (
        <button onClick={() => deleteBlog(blog)}>Remove</button>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Blog;
