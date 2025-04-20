import { useParams } from 'react-router-dom'
import { Card, ListGroup } from 'react-bootstrap';

  
  const User = ({ users }) => {
    const id = useParams().id
    const user = users.find(user => user.id === id)
    console.log("users:", users)
    console.log("user:", user)
    if (!user) {
      return null
    }
  
    return (
      <Card className='mb-4'>
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <Card.Subtitle className='my-3'>Added blogs</Card.Subtitle>
          <ListGroup variant="flush">
              {user.blogs.map(blog => (
                  <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item> 
              ))}
          </ListGroup>
        </Card.Body>
      </Card>
    )
  }

export default User