import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import useField from '../hooks'
import { loginUser } from '../reducers/loginReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser(username.value, password.value))
    history.push('/')
    username.reset()
    password.reset()
  }

  return (
    <>
      <h2>Log in to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            id='username'
            type={username.type}
            value={username.value}
            onChange={username.onChange}
          />
          <Form.Label>password</Form.Label>
          <Form.Control
            id='password'
            type={password.type}
            value={password.value}
            onChange={password.onChange}
          />
          <Button variant='primary' type="submit" id='login'>login</Button>
        </Form.Group>
      </Form>
    </>
  )
}

export default LoginForm