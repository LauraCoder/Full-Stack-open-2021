import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, handleUsernameChange, handlePasswordChange, username, password }) => {

  return (
    <>
      <h2>Log in to application</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type='password'
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" id='login'>login</button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm