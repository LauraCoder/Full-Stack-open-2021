import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

import BlogForm from './BlogForm'
import Togglable from './Togglable'

import { Table } from 'react-bootstrap'

const BlogList = () => {
  const blogs = useSelector(state => state.blog)

  const dispatch = useDispatch()

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(blogObject))
      dispatch(setNotification({
        text: `a new blog ${blogObject.title} by ${blogObject.author}`,
        type: 'success'
      }, 3))
    } catch (exception) {
      dispatch(setNotification({
        text: 'something went wrong, new blog wasn not added',
        type: 'danger'
      }, 3))
    }
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const byLikes = (a,b) => b.likes - a.likes


  return (
    <>
      <h2>blogs</h2>
      {blogForm()}
      <Table striped>
        <tbody>
          {blogs.sort(byLikes).map(blog =>
            <tr className='blogHeader' key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} - {blog.author}
                </Link>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  )
}

export default BlogList