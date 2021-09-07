import React, { useState, useRef, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs( blogs )
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage({
        text: 'wrong credentials',
        type: 'error'
      })
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(null)
      setMessage({
        text: 'you are now logged out',
        type: 'success'
      })
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (exception) {
      setMessage({
        text: 'something went wrong while logging out',
        type: 'error'
      })
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage({
          text: `a new blog ${blogObject.title} by ${blogObject.author}`,
          type: 'success'
        })
        setTimeout(() => {
          setMessage(null)
        }, 3000)
        console.log('Blog added')
      })
      .catch(error => {
        console.log(error.response.data)
        setMessage({
          text: 'something went wrong, new blog wasn not added',
          type: 'error'
        })
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const addLikes = async (blogObject) => {
    await blogService.update(blogObject.id, blogObject)
    blogService.getAll()
      .then(blogs => { setBlogs(blogs) })
      .then(() => {
        setMessage({
          text: 'New like was added!',
          type: 'success'
        })
        setTimeout(() => {
          setMessage(null)
        }, 3000)
        console.log('Blog added')
      })
      .catch(error => {
        console.log(error.response.data)
        setMessage({
          text: 'Adding like did not work',
          type: 'error'
        })
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
  }

  const deleteBlog = (id, title) => {
    if (window.confirm(`Delete ${title} ?`)) {
      blogService
        .deleteBlog(id)
        .then(response => {
          setBlogs(blogs.filter(blog => blog.id !== id))
          setMessage({
            text: `Blog ${title} was deleted`,
            type: 'success'
          })
          setTimeout(() => {
            setMessage(null)
          }, 2000)
          console.log('Blog deleted', response)
        })
        .catch(error => {
          setMessage({
            text: `Blog '${title}' was already removed from server`,
            type: 'error'
          })
          setTimeout(() => {
            setMessage(null)
          }, 2000)
          console.error(error)
          setBlogs(blogs.filter(blog => blog.id !== id))
        })
    }
  }

  const sortBlogs = () => {
    return (
      blogs
        .sort((a,b) => b.likes - a.likes)
        .map(blog =>
          <BlogList key={blog.id} blog={blog} addLikes={addLikes} deleteBlog={deleteBlog} user={user}/>
        )
    )
  }

  if (user === null) {
    return (
      <div>
        <Notification message={message} />
        <LoginForm
          handleLogin={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          password={password}
          username={username}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      {blogForm()}
      <ul className='blogStyle'>
        {sortBlogs()}
      </ul>
    </div>
  )
}


export default App