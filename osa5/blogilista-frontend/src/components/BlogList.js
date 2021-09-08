import React, { useState } from 'react'
import Blog from './Blog'
import DeleteButton from './DeleteButton'

const BlogList = ({ blog, addLikes, deleteBlog, user }) => {
  const [ show, setShow ] = useState(false)

  const handleClick = () => setShow(!show)

  const addMoreLikes = () => {
    const blogObject = { ...blog, likes: blog.likes + 1 }
    addLikes(blogObject)
  }

  const removeBlog = () => {
    deleteBlog(blog.id, blog.title)
  }

  const label = show
    ? 'hide'
    : 'show'

  //Clicking title will either show or hide information of a blog
  if (show) {
    return (
      <>
        <li className='blogInfo'>
          <h4>{blog.title} - {blog.author}</h4>
          <button onClick={handleClick}>
            {label}
          </button>
          <ul className='blogInfo'>
            <Blog blog={blog} addMoreLikes={addMoreLikes} removeBlog={removeBlog} user={user} />
            <DeleteButton removeBlog={removeBlog} blog={blog} user={user}/>
          </ul>
        </li>
      </>
    )
  }

  //If title is not clicked, only the list of filtered countries will be shown
  return (
    <>
      <li className='blogHeader'>
        <h4>{blog.title} - {blog.author}</h4>
        <button onClick={handleClick}>
          {label}
        </button>
      </li>
    </>
  )
}

export default BlogList