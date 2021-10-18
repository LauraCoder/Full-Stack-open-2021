const blogsRouter = require('express').Router()
const userExtractor = require('../utils/middleware').userExtractor
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const User = require('../models/user')

//get all the blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1 })
    .populate('comments', { comment: 1, id: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
})

//post a new blog
blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user
  const activeUser = await User.findById(user.id)

  if (body.title === undefined || body.url === undefined) {
    return response.status(400).end()
  }

  const blog = new Blog ({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: activeUser._id
  })

  const savedBlog = await blog.save()
  activeUser.blogs = activeUser.blogs.concat(savedBlog._id)
  await activeUser.save()

  response.json(savedBlog.toJSON())
})

//get a specific blog by id
blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

//post a comment of a blog
blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  const blog = await Blog.findById(request.params.id)

  const comment = new Comment ({
    comment: body.comment
  })

  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()
  response.json(savedComment.toJSON())
})

//delete a blog
blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const id = request.params.id
  const blog = await Blog.findById(id)

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  } else {
    response.status(401).json({
      error: 'Unauthorized to delete the blog',
    })
  }
})

//update a blog
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter