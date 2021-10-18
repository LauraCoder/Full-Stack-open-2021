import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch, Link, Redirect } from 'react-router-dom'

import { Button, Navbar, Nav } from 'react-bootstrap'

import Notification from './components/Notification'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'

import { setNotification } from './reducers/notificationReducer'
import { logoutUser, setUser } from './reducers/loginReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'

const App = () => {
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blog)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  },[dispatch])

  const handleLogout = (event) => {
    event.preventDefault()
    try {
      dispatch(logoutUser())
      dispatch(setNotification({
        text: 'you are now logged out',
        type:'success'
      }, 3))
    } catch (exception) {
      dispatch(setNotification({
        text: 'something went wrong while logging out',
        type: 'danger'
      }, 3))
    }
  }

  const matchUser = useRouteMatch('/users/:id')
  const userMatch = matchUser
    ? users.find(user => user.id === matchUser.params.id)
    : null

  const matchBlog = useRouteMatch('/blogs/:id')
  const blogMatch = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

  const padding = {
    padding: 10
  }

  return (
    <div className="container col-lg-7">
      {user === null ?
        <div>
          <Notification />
          <LoginForm />
        </div> :
        <div>
          <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#" as="span">
                  <Link to="/">blogs</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link to="/users">users</Link>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
              <Nav className="me-auto">
                <Navbar.Text style={padding}>
                  <em>{user.username} logged in</em>
                </Navbar.Text>
                <Button variant='outline-secondary' onClick={handleLogout}>logout</Button>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Notification />
          <Switch>
            <Route path='/users/:id'>
              <User user={userMatch}/>
            </Route>
            <Route path="/users">
              <UserList />
            </Route>
            <Route path='/blogs/:id'>
              <Blog blog={blogMatch} user={user}/>
            </Route>
            <Route path="/">
              {user ? <BlogList user={user} /> : <Redirect to="/login" />}
            </Route>
          </Switch>
        </div>
      }
    </div>
  )
}

export default App