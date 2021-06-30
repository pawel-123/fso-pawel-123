import React from 'react'
import { useSelector } from 'react-redux'

const SuccessBox = () => {
  const success = useSelector(state => state.notifications.successMessage)

  const successStyle = {
    color: 'green',
    fontSize: 16
  }

  return success ? <p className="success" style={successStyle}>{success}</p> : null
}

export default SuccessBox