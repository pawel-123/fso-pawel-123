const initialState = {
  errorMessage: null,
  successMessage: null
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ERROR':
      return { ...state, errorMessage: action.data.error }
    case 'SUCCESS':
      return { ...state, successMessage: action.data.success }
    default:
      return state
  }
}

export const notificationError = error => {
  return {
    type: 'ERROR',
    data: {
      error
    }
  }
}

export const notificationSuccess = success => {
  return {
    type: 'SUCCESS',
    data: {
      success
    }
  }
}

export default notificationReducer