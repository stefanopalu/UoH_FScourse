import React from "react";
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
  blogFormRef,
  deleteBlog,
}) => {
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

      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          deleteBlog={() => deleteBlog(blog)}
          user={user}
        />
      ))}
    </div>
  );
};

export default BlogList;