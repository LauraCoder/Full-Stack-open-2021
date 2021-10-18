import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const loginReducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
  case 'USER_LOGIN':
    return action.data
  case 'LOGOUT_USER':
    return null
  default: return state
  }
}

export const setUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    return {
      type: 'USER_LOGIN',
      data: user
    }
  }
  return { type: 'LOGOUT_USER' }
}

export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setUser())
    } catch (exeption) {
      dispatch(setNotification({
        text: 'wrong credentials',
        type: 'danger'
      }, 3))
    }
  }
}

export const logoutUser = () => {
  window.localStorage.removeItem('loggedBlogappUser')
  return {
    type: 'LOGOUT_USER'
  }
}

export default loginReducer