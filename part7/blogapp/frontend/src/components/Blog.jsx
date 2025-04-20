import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux'
import { voteBlog, commentBlog } from "../reducers/blogsReducer";
import { useParams } from 'react-router-dom'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, ListGroup } from 'react-bootstrap';

const Blog = ({ deleteBlog, user }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch()
  const id = useParams().id
  const blogs = useSelector((state) => state.blogs)
  const navigate = useNavigate()

  if (!blogs.length) {
    return <div>Loading blogs...</div>;
  }
  const blog = blogs.find(blog => blog.id === id)

  const addLike = (blog) => {
    dispatch(voteBlog(blog))
  };

  const addComment = (event) => {
    event.preventDefault();

    dispatch(commentBlog(blog.id, comment));
    setComment("");
  };

  return (
    <Card >
      <Card.Body>
        <Card.Title>{blog.title} - {blog.author}</Card.Title>
          <Card.Text>
            <a href={blog.url} >{blog.url}</a>
          </Card.Text>
        <div className="mb-2">
          {blog.likes} likes 
          <Button variant="outline-primary" size="sm" className="mx-2" onClick={() => addLike(blog)}>Like</Button>
        </div>
        <div className="mb-3">added by {blog.user.name}</div>
          {user.id === blog.user.id && (
            <Button variant="danger" size="sm" onClick={() => {
              deleteBlog(blog)
              navigate('/')
            }}>
                Remove
            </Button>
          )}

        <div>
          <h4 className="mt-3">Comments</h4>
          <Form className="mb-3" onSubmit={addComment}>
            <Form.Group>
              <Form.Control controlId="comment"
                type="text"
                value={comment}
                name="Comment"
                onChange={({ target }) => setComment(target.value)}
              />
            </Form.Group>
            <Button className="my-3" type="submit">Add comment</Button>
          </Form>
            <ListGroup>
              {blog.comments.map(comment => (
                <ListGroup.Item key={comment.id}>{comment.content}</ListGroup.Item>
              ))}
            </ListGroup>
        </div>
      </Card.Body>
    </Card>
  );
};

Blog.propTypes = {
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Blog;
