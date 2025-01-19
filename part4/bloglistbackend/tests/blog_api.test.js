const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { assert } = require('console')

const api = supertest(app)

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
        assert(blog.id)
    )
  })

after(async () => {
  await mongoose.connection.close()
})