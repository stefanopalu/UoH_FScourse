import React from "react";
import { Link } from 'react-router-dom'
import NewBlogForm from "./NewBlogForm";
import Togglable from "./Togglable";
import { Card } from 'react-bootstrap';

const BlogList = ({
  title,
  author,
  blogUrl,
  setTitle,
  setAuthor,
  setBlogUrl,
  createBlog,
  sortedBlogs,
  user,
  blogs,
  blogFormRef,
  deleteBlog,
}) => {
  const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: "solid",
      borderWidth: 1,
      marginBottom: 5,
    };
  return (
    <div>
      <Togglable
        showButtonLabel="new blog"
        hideButtonLabel="cancel"
        ref={blogFormRef}
      >
        <h2>Create New Blog</h2>
        <NewBlogForm
          title={title}
          author={author}
          blogUrl={blogUrl}
          createBlog={createBlog}
          setTitle={setTitle}
          setAuthor={setAuthor}
          setBlogUrl={setBlogUrl}
        />
      </Togglable>
      <div>
      {sortedBlogs.map((blog) => (
        <Card className="mb-3">
          <Card.Body>
            <Link to={`/blogs/${blog.id}`}>
              <Card.Title>{blog.title}</Card.Title>
            </Link>
          </Card.Body>
        </Card>
      ))}
      </div>
    </div>
  );
};

export default BlogList;