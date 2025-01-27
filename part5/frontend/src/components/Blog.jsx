import Togglable from "./Togglable"
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, deleteBlog, user}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  console.log("User ID:", user.id)
  console.log("Blog User ID:", blog.user.id)

  const addLike = async () => {
    const updatedBlog = {...blog, likes: blog.likes +1}
    const returnedBlog = await blogService.update(blog.id, updatedBlog)
    console.log('Returned Blog:', returnedBlog)
    setBlogs(blogsBefore =>
      blogsBefore.map(blog => blog.id === returnedBlog.id ? returnedBlog : blog)
    )
  } 

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
        <Togglable showButtonLabel='view' hideButtonLabel='hide'>
          <div>
            {blog.url}
          </div>
          <div>
            {blog.likes} <button onClick={addLike}>like</button>
          </div>
          <div>
            {blog.user.name}
          </div>
        </Togglable>
        {user.id === blog.user.id && ( 
      <button onClick={() => deleteBlog(blog)}>Remove</button>
    )}
    </div>
)}
  
export default Blog