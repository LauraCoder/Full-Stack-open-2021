const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sum = (total, blog) => {
    return total + blog.likes
  }
  return blogs.length === 0
    ? 0
    : blogs.reduce(sum, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce(
    (a, b) => a.likes > b.likes
      ? a
      : b
  )
}

const mostBlogs = (blogs) => {

  const mapBlogs = _.map(blogs, 'author')
  const countAuth = _.countBy(mapBlogs)
  const pairs = _.toPairs(countAuth)
  const maxAmount = _.maxBy(pairs, _.last)

  const mostBlogs = {
    author: maxAmount[0],
    blogs: maxAmount[1]
  }

  return mostBlogs
}

const mostLikes = (blogs) => {

  const sumLikes = blogs.reduce((sum, { author, likes }) => {
    sum[author] = sum[author] || 0
    sum[author] += likes
    return sum
  }, {})

  const pairs = _.toPairs(sumLikes)
  const maxAmount = _.maxBy(pairs, _.last)

  const mostLikes = {
    author: maxAmount[0],
    likes: maxAmount[1]
  }

  return mostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}