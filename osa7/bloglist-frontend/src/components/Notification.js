import React from 'react'
import { useSelector } from 'react-redux'

import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  return notification === null
    ? null :
    <Alert variant={notification.type}>
      {notification.text}
    </Alert>
}

export default Notification