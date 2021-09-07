import React from 'react'

const DeleteButton = ({ blog, user, removeBlog }) => {
  return user.username !== blog.user.username
    ? null
    : <button onClick={removeBlog}>delete</button>
}

export default DeleteButton