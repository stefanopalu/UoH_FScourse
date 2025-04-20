import Togglable from "./Togglable";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux'
import { voteBlog } from "../reducers/blogsReducer";
import { useParams } from 'react-router-dom'

const Blog = ({ deleteBlog, user }) => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blogs = useSelector((state) => state.blogs)

  if (!blogs.length) {
    return <div>Loading blogs...</div>;
  }
  const blog = blogs.find(blog => blog.id === id)

  const addLike = (blog) => {
    dispatch(voteBlog(blog))
  };

  return (
    <div >
      <h2>{blog.title} - {blog.author}</h2>
        <a href={blog.url} >{blog.url}</a>
        <div>
          {blog.likes} likes <button onClick={() => addLike(blog)}>like</button>
        </div>
        <div>added by {blog.user.name}</div>
      {user.id === blog.user.id && (
        <button onClick={() => deleteBlog(blog)}>Remove</button>
      )}
    </div>
  );
};

Blog.propTypes = {
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Blog;
