const timeoutReducer = (state = '', action) => {
  switch (action.type) {
    case 'TIMEOUT':
      return action.timeoutId
    default:
      return state
  }
}

export default timeoutReducer