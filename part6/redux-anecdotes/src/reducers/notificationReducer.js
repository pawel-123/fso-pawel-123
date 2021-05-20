const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export const setNotification = (notification, displayTime) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      notification
    })
    setTimeout(() => 
      dispatch({ 
        type: 'NOTIFICATION', 
        notification: '' 
      }), 
      displayTime * 1000
    )
  }
}

export default notificationReducer