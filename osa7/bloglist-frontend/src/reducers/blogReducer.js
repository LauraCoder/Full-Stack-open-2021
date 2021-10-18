import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'DELETE_BLOG':
    return state.filter(blog => blog.id !== action.data)
  case 'LIKE_BLOG':{
    const blog = state.find(blog => blog.id === action.data.id)
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    return state.map(blog => blog.id !== action.data.id ? blog : likedBlog)
  }
  case 'COMMENT_BLOG':{
    const id = action.data.id
    const comment = action.data.comment
    const blog = state.find(blog => blog.id === id)
    const newComment = { comment, id }
    const commentedBlog = {
      ...blog,
      comments: [...blog.comments, newComment]
    }
    return state.map(blog => blog.id !== id ? blog : commentedBlog)
  }
  case 'INIT_BLOGS':
    return action.data
  default: return state
  }
}

export const createBlog = blogObject => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id
    })
  }
}

export const likeBlog = (id, likedBlog) => {
  return async dispatch => {
    await blogService.update(id, likedBlog)
    dispatch({
      type: 'LIKE_BLOG',
      data: likedBlog
    })
  }
}

export const commentBlog = (id, newComment) => {
  return async dispatch => {
    let commentedBlog = await blogService.addComment(id, newComment)
    commentedBlog = { ...commentedBlog, id }
    dispatch({
      type: 'COMMENT_BLOG',
      data: commentedBlog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export default blogReducer