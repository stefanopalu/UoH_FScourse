const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')

const api = supertest(app)

const Blog = require('../models/blog');

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
  
  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
  })

test.only('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test.only('blogs unique identifier', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    blogs.forEach (blog =>
        assert.ok(blog.id)
    )
  })

test.only('a blog can be added ', async () => {
  const newBlog = {
    title: 'newtitle',
    author: 'newauthor',
    url: 'newurl',
    likes: 6,
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  assert.strictEqual(response.body.length, initialBlogs.length + 1)

  assert(titles.includes('newtitle'))
})

test.only('missing likes to zero', async () => {
  const newBlog = {
    title: 'title',
    author: 'author',
    url: 'url',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test.only('missing title', async () => {
    const newBlog = {
      author: 'author',
      url: 'url',
    }
  
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
  })

test.only('missing url', async () => {
    const newBlog = {
      title: 'title',
      author: 'author',
    }
  
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
  })

after(async () => {
  await mongoose.connection.close()
})