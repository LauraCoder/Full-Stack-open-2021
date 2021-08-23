const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

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

test('there are three blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the unique indetifier property of the blog posts in named as "id"', async () => {
  const blogs = await Blog.find({})
  const blogId = blogs[0].id

  expect(blogId).toBeDefined()
})

test('it is possible to post blogs to /api/blogs', async () => {
  const newBlog = {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
    likes: 10
  }
  
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(200)
  .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(b => b.title)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(titles).toContain('First class tests')
})

test('blog with undefined likes will get as default 0 likes', async () => {
  const newBlog = {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  const response = await helper.blogsInDb()
  const findNewBlog = await response.find(b => b.title === "First class tests")

  expect(response).toHaveLength(helper.initialBlogs.length + 1)
  expect(findNewBlog.likes).toBe(0)
})

test('it is not possible to post a blog with undefined title', async () => {
  const newBlog = {
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

    const response = await helper.blogsInDb()
  
    expect(response).toHaveLength(helper.initialBlogs.length)
})

test('neither it is possible to post a blog with undefined url', async () => {
  const newBlog = {
    title: "First class tests",
    author: "Robert C. Martin",
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

    const response = await helper.blogsInDb()
  
    expect(response).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})