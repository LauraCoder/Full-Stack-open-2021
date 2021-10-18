import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { commentBlog, likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

import { Button, Table } from 'react-bootstrap'

const Blog = ({ blog, user }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()

  const addLikes = async () => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(likeBlog(blog.id, likedBlog))
    dispatch(setNotification({
      text: 'New like was added!',
      type: 'success'
    }, 3))
  }

  const removeBlog = async () => {
    try {
      if (window.confirm(`Delete ${blog.title} ?`)) {
        dispatch(deleteBlog(blog.id))
        dispatch(setNotification({
          text: `Blog ${blog.title} was deleted`,
          type: 'success'
        }, 3))
        history.push('/')
      }
    } catch(exeption) {
      dispatch(setNotification({
        text: `Blog '${blog.title}' was already removed from server`,
        type: 'danger'
      }, 3))
    }
  }

  const handleComment = (event) => {
    setComment(event.target.value)
  }

  const addComment = (event) => {
    event.preventDefault()

    const newComment = { comment }

    dispatch(commentBlog(blog.id, newComment))
    dispatch(setNotification({
      text: 'New comment was added!',
      type: 'success'
    }, 3))
    setComment('')
  }

  return !blog
    ? null
    : (<>
      <h2>{blog.title} - {blog.author}</h2>
      <p>{blog.url}</p>
      <p>likes: {blog.likes} <Button variant='primary' onClick={addLikes}>like</Button></p>
      {user.username === blog.user.username
        ? <Button variant='danger' onClick={() => removeBlog(blog.id)}>remove</Button>
        : null
      } <br />
      <h4>Comments</h4>
      <form onSubmit={addComment}>
        <div>
          comment a blog
          <input
            type='text'
            value={comment}
            id='comment'
            onChange={handleComment}
          />
        </div>
        <Button variant='primary' type='submit'>add</Button>
      </form>
      <Table striped>
        <tbody>
          <tr>
            <th>comments</th>
          </tr>
          {blog.comments.map(comment =>
            <tr key={comment.id}>
              <td>
                {comment.comment}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>)
}

export default Blog