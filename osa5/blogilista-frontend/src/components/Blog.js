import React from 'react'

const Blog = ({ blog, addMoreLikes }) => {

  return (
    <>
      <li>
        <p>{blog.url}</p>
        <p>likes: {blog.likes} <button onClick={addMoreLikes}>like</button></p>
        <p>author: {blog.author}</p>
      </li>
    </>
  )
}

export default Blog