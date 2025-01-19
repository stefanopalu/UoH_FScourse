const Blog = require('../models/blog')

const initialBlogs = [
    {
      title: 'title1',
      author: 'author1',
      url: "url1",
      likes: 6,
    },
    {
      title: 'title2',
      author: 'author2',
      url: "url2",
      likes: 5,
    },
  ]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}