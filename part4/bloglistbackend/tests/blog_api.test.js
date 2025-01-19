const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')

const api = supertest(app)

const helper = require('./test_helper')

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs unique identifier', async () => {
  const blogs = await helper.blogsInDb()
    blogs.forEach (blog =>
        assert.ok(blog.id)
    )
  })

test('a blog can be added ', async () => {
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

  const blogsAtEnd = await helper.blogsInDb()
  const titles = blogsAtEnd.map(r => r.title)

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  assert(titles.includes('newtitle'))
})

test('missing likes to zero', async () => {
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

test('missing title', async () => {
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

test('missing url', async () => {
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

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})

test.only('a blog can be modified', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToModify = blogsAtStart[0]

    const newBlog = {
      title: 'newtitle',
      author: 'newauthor',
      url: 'newurl',
      likes: blogToModify.likes+1,
    }
    
    await api
      .put(`/api/blogs/${blogToModify.id}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
      const updatedBlog = await helper.blogsInDb()
        .then(blogs => blogs.find(blog => blog.id === blogToModify.id));

    assert.strictEqual(updatedBlog.title, 'newtitle');
    assert.strictEqual(updatedBlog.author, 'newauthor');
    assert.strictEqual(updatedBlog.url, 'newurl');
    assert.strictEqual(updatedBlog.likes, blogToModify.likes + 1);
  })

after(async () => {
  await mongoose.connection.close()
})