const Blog = require('../models/blog')
const User = require('../models/user')

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

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, usersInDb
}