import React from 'react'

//renders notification message
const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={message.type}>
        {message.text}
      </div>
    )
  }

export default Notification