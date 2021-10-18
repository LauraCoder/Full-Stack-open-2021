import React from 'react'

//renders notification message
const Notification = ({ message }) => {
  return message === null
    ? null :
    <div className={message.type}>
      {message.text}
    </div>
}

export default Notification