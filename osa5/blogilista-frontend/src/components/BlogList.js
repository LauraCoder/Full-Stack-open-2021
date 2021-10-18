import React, { useState } from 'react'
import Blog from './Blog'
import DeleteButton from './DeleteButton'

const BlogHeader = ({ handleClick, label, blog }) => {
  return (
    <>
      <h4>{blog.title} - {blog.author}</h4>
      <Button handleClick={handleClick} label={label} />
    </>
  )
}

const Button = ({ handleClick, label }) => {
  return (
    <button onClick={handleClick}>
      {label}
    </button>
  )
}

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

  //Clicking button will either show or hide information of a blog
  if (show) {
    return (
      <>
        <li className='blogInfo'>
          <BlogHeader handleClick={handleClick} label={label} blog={blog} />
          <ul className='blogInfo'>
            <Blog blog={blog} addMoreLikes={addMoreLikes} removeBlog={removeBlog} user={user} />
            <DeleteButton removeBlog={removeBlog} blog={blog} user={user}/>
          </ul>
        </li>
      </>
    )
  }

  return (
    <>
      <li className='blogHeader'>
        <BlogHeader handleClick={handleClick} label={label} blog={blog} />
      </li>
    </>
  )
}

export default BlogList