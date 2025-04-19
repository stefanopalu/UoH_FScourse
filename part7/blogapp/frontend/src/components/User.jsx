import { useParams } from 'react-router-dom'
  
  const User = ({ users }) => {
    const id = useParams().id
    const user = users.find(user => user.id === id)
    console.log("users:", users)
    console.log("user:", user)
    if (!user) {
      return null
    }
  
    return (
      <div>
        <h2>{user.name}</h2>
        <p>added blogs</p>
        <ul>
            {user.blogs.map(blog => (
                <li key={blog.id}>{blog.title}</li> 
            ))
            }
        </ul>
      </div>
    )
  }

  export default User