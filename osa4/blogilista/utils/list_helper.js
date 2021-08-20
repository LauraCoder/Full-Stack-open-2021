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
    return blogs.reduce((a, b) => a.likes > b.likes ? a : b )
}
  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}