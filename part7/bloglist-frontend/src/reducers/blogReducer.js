import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_BLOGS':
      return action.data.blogs
    case 'NEW_BLOG':
      return [...state, action.data.newBlog]
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: {
        blogs
      }
    })
  }
}

export const createBlog = newObject => {
  return async dispatch => {
    const newBlog = await blogService.create(newObject)
    dispatch({
      type: 'NEW_BLOG',
      data: {
        newBlog
      }
    })
  }
}

export default blogReducer