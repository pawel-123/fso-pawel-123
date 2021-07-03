import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
  switch(action.type) {
    case 'SET_USER':
      return action.data.currentUser
    case 'REMOVE_USER':
      return null
    default:
      return state
  }
}

export const setUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const currentUser = JSON.parse(loggedUserJSON)
      blogService.setToken(currentUser.token)
      dispatch({
        type: 'SET_USER',
        data: {
          currentUser
        }
      })
    }
  }
}

export const removeUser = () => {
  window.localStorage.removeItem('loggedBloglistUser')
  return {
    type: 'REMOVE_USER'
  }
}

export default userReducer