const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  var newState
  switch (action.type) {
    case 'GOOD':
      newState = {...state}
      newState.good++
      return newState
    case 'OK':
      newState = {...state}
      newState.ok++
      return newState
    case 'BAD':
      newState = {...state}
      newState.bad++
      return newState
    case 'ZERO':
      newState = {...initialState}
      return newState
    default: return state
  }
  
}

export default counterReducer