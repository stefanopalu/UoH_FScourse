import React from "react";
import Togglable from '../components/Togglable'
import NewBlogForm from '../components/NewBlogForm'
import Blog from '../components/Blog'

const BlogList = ({
  title,
  author,
  blogUrl,
  setTitle,
  setAuthor,
  setBlogUrl,
  createBlog,
  blogs, // No need for sortedBlogs prop
  user,
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

  // Sort blogs inside the component
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

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

      {sortedBlogs.map(blog => (
        <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} user={user} />
      ))}
    </div>
  );
};

export default BlogList;