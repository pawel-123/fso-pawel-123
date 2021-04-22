import React from 'react'

const ErrorBox = ({ error }) => {
  const errorStyle = {
    color: 'red',
    fontSize: 16
  }

  return (
    <p className="error" style={errorStyle}>{error}</p>
  )
}

export default ErrorBox