const newBlogForm = ({ title, author, blogUrl, createBlog, setTitle, setAuthor, setBlogUrl}) => (
    <form onSubmit={createBlog}>
    <div>
      title:
        <input
        type="text"
        value={title}
        name="Title"
        onChange={({ target }) => setTitle(target.value)}
      />
    </div>
    <div>
      author:
        <input
        type="text"
        value={author}
        name="Author"
        onChange={({ target }) => setAuthor(target.value)}
      />
    </div>
    <div>
      url:
        <input
        type="text"
        value={blogUrl}
        name="BlogUrl"
        onChange={({ target }) => setBlogUrl(target.value)}
      />
    </div>
    <button type="submit">create</button>
  </form>
  )

export default newBlogForm