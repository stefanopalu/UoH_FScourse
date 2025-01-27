import Togglable from "./Togglable"

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
            {blog.likes}
          </div>
          <div>
            {blog.user.name}
          </div>
        </Togglable>
      
    </div>
)}
  
export default Blog