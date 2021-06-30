const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

// why does it run when an app gets initialized?
let timeoutId
console.log('after let timeoutId', timeoutId)

export const setNotification = (notification, displayTime) => {
  return async dispatch => {
    console.log('at the beginning of setNotification', timeoutId)
    dispatch({
      type: 'NOTIFICATION',
      notification
    })

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => 
      dispatch({ 
        type: 'NOTIFICATION', 
        notification: '' 
      }), 
      displayTime * 1000
    )
    console.log('after setTimeout in setNotification', timeoutId)
  }
}

export default notificationReducer