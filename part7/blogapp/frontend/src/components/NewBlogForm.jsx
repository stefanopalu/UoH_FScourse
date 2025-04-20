import { useState } from "react";
import { Form, Button } from 'react-bootstrap'

const NewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();

    const blogObject = {
      title: title,
      author: author,
      url: blogUrl,
    };
    createBlog(blogObject);
    setTitle("");
    setAuthor("");
    setBlogUrl("");
  };

  return (
    <Form onSubmit={addBlog}>
      <Form.Group controlId="title-input">
        <Form.Label>Title</Form.Label>
        <Form.Control
          data-testid="title-input"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </Form.Group>
      <Form.Group controlId="author-input">
        <Form.Label>Author</Form.Label>
        <Form.Control
          data-testid="author-input"
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </Form.Group>
      <Form.Group controlId="url-input">
        <Form.Label>URL</Form.Label>
        <Form.Control
          data-testid="url-input"
          type="text"
          value={blogUrl}
          name="BlogUrl"
          onChange={({ target }) => setBlogUrl(target.value)}
        />
      </Form.Group>
      <Button className="my-3" variant="primary" type="submit">create</Button>
    </Form>
  );
};

export default NewBlogForm;
