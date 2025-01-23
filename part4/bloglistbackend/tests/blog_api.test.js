const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt');

const assert = require('node:assert')

const api = supertest(app)

const helper = require('./test_helper')

const Blog = require('../models/blog')
const User = require('../models/user')

let token

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()

  const initialBlogsWithUser = helper.initialBlogs.map(blog => ({
    ...blog,
    user: user._id, 
  }));

  await Blog.insertMany(initialBlogsWithUser)

  const loginResponse = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' })
      .expect(200); 

  token = loginResponse.body.token; 
    if (!token) {
      console.error('Token missing in login response');
      throw new Error('Token not found'); 
    }
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

  test('a blog can be added', async () => {
    const newBlog = {
      title: 'newtitle',
      author: 'newauthor',
      url: 'newurl',
      likes: 6,
    }
    
    const blogResponse = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`) 
      .expect(201) 
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(r => r.title)
  
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    assert(titles.includes('newtitle'))
  });

test('missing likes to zero', async () => {
  const newBlog = {
    title: 'title',
    author: 'author',
    url: 'url',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${token}`) 
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
      .set('Authorization', `Bearer ${token}`) 
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
      .set('Authorization', `Bearer ${token}`) 
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
  })

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${token}`) 
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})

test('a blog can be modified', async () => {
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

  test('a blog cannot be added with an invalid token', async () => {
    console.log('Test started'); // Check if this prints
  
    const invalidToken = 'invalidtoken'; // Invalid token
  
    const newBlog = {
      title: 'newtitle',
      author: 'newauthor',
      url: 'newurl',
      likes: 6,
    };
  
    try {
      const blogResponse = await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${invalidToken}`)
        .expect(401) // Expecting 401 Unauthorized
        .expect('Content-Type', /application\/json/);
  
      console.log('Status Code:', blogResponse.status);
      console.log('Response Body:', blogResponse.body);
    } catch (error) {
      console.error('Error caught:', error);
    }
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'newuser',
      name: 'New User',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fail with a short username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ml',
      name: 'Short Name',
      password: 'password',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    assert.ok(response.body.error.includes('is shorter than'))
  })

test('creation fail with a username not unique', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
  username: 'root',
  name: 'Short Name',
  password: 'password',
  }
 
  const response = await api
  .post('/api/users')
  .send(newUser)
  .expect(400)
  .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()
  assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  
  assert.strictEqual(response.body.error, 'expected username to be unique')
})

after(async () => {
  await mongoose.connection.close()
})