import Togglable from "./Togglable"
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

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
      
    </div>
)}
  
export default Blog