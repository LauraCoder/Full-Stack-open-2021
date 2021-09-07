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

  //Clicking title will either show or hide information of a blog
  if (show) {
    return (
      <>
        <li>
          <h4>{blog.title}</h4>
          <button onClick={handleClick}>
            {show ? 'hide' : 'show' }
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
      <li>
        <h4>{blog.title}</h4>
        <button onClick={handleClick}>
          {show ? 'hide' : 'show' }
        </button>
      </li>
    </>
  )
}

export default BlogList