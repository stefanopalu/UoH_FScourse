import { useState } from "react";

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
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          id="title-input"
          data-testid="title-input"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          id="author-input"
          data-testid="author-input"
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          id="url-input"
          data-testid="url-input"
          type="text"
          value={blogUrl}
          name="BlogUrl"
          onChange={({ target }) => setBlogUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default NewBlogForm;
