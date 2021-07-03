import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_BLOGS':
      return action.data.blogs
    case 'NEW_BLOG':
      return [...state, action.data.newBlog]
    case 'LIKE_BLOG': {
    //   const id = action.data.id
    //   const blogToLike = state.blogs.find(blog => blog.id === id)
    //   const likedBlog = {
    //     ...blogToLike,
    //     likes: blogToLike.likes + 1
    //   }
    //   return state.map(blog => blog.id === id ? likedBlog : blog)
    // }
      const likedBlog = action.data.likedBlog
      return state.map(blog => likedBlog.id === blog.id ? likedBlog : blog)
    }
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    dispatch({
      type: 'INIT_BLOGS',
      data: {
        blogs: sortedBlogs
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

export const likeBlog = blogId => {
  return async dispatch => {
    const likedBlog = await blogService.like(blogId)
    dispatch({
      type: 'LIKE_BLOG',
      data: {
        likedBlog
      }
    })
  }
}

export default blogReducer