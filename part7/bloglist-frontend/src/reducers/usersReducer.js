import userService from '../services/users'

const usersReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_USERS':
      return action.data.users
    default:
      return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    const sortedUsers = users.sort((a, b) => b.blogs.length - a.blogs.length)
    dispatch({
      type: 'INIT_USERS',
      data: {
        users: sortedUsers
      }
    })
  }
}

export default usersReducer