let timeoutID

const notificationReducer = (state = null, action) => {
  console.log(action)
  switch (action.type) {
  case 'SET_MESSAGE':
    return action.notification
  case 'HIDE_MESSAGE':
    return null
  default:
    return state
  }
}

export const setNotification = (notification, time) => {
  return async dispatch => {
    clearTimeout(timeoutID)
    dispatch({
      type: 'SET_MESSAGE',
      notification
    })
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'HIDE_MESSAGE'
      })
    }, time * 1000)
  }
}

export default notificationReducer