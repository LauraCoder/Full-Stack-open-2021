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

export const setNotification = (notification) => {
  return {
      type: 'SET_MESSAGE',
      notification
  } 
}

export const hideNotification = () => {
    return {
        type: 'HIDE_MESSAGE'
    }
}

export default notificationReducer