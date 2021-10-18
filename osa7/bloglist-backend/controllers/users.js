const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

//add a new user
usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.password || body.password === '') {
    return response.status(400).end('Password is undefined')
  } else if (body.password.length < 3) {
    return response.status(400).end('Password is too short')
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

//get all users
usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })

  response.json(users.map(u => u.toJSON()))
})

//get a specific user by id
usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
  if (user) {
    response.json(user.toJSON())
  } else {
    response.status(404).end()
  }
})

module.exports = usersRouter