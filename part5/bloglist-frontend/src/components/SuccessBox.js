import React from 'react'

const SuccessBox = ({ success }) => {
  const successStyle = {
    color: 'green',
    fontSize: 16
  }

  return (
    <p className="success" style={successStyle}>{success}</p>
  )
}

export default SuccessBox