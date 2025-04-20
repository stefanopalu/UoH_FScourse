import React from "react";
import { Link } from 'react-router-dom'
import Blog from "./Blog";
import NewBlogForm from "./NewBlogForm";
import Togglable from "./Togglable";

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
        <h2>create new</h2>
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
        <div style={blogStyle} className="blog">
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
      </div>
    </div>
  );
};

export default BlogList;