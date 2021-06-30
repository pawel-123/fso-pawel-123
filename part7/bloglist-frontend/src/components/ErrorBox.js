import React from 'react'
import { useSelector } from 'react-redux'

const ErrorBox = () => {
  const error = useSelector(state => state.notifications.errorMessage)

  const errorStyle = {
    color: 'red',
    fontSize: 16
  }

  return error ? <p className="error" style={errorStyle}>{error}</p> : null
}

export default ErrorBox