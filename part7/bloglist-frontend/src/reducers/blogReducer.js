import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_BLOGS':
      return action.data.blogs
    case 'NEW_BLOG':
      return [...state, action.data.newBlog]
    case 'LIKE_BLOG': {
      const { blogId, newLikes } = action.data

      return state.map(blog => {
        return blogId === blog.id
          ? { ...blog, likes: newLikes }
          : blog
      })
    }
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.data.blogId)
    case 'NEW_COMMENT': {
      const { blogId, newComment } = action.data

      return state.map(blog => {
        return blogId === blog.id
          ? { ...blog, comments: blog.comments.concat(newComment) }
          : blog
      })
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
    const blogResponse = await blogService.create(newObject)
    const newBlog = await blogService.getBlog(blogResponse.id)
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
        blogId,
        newLikes: likedBlog.likes
      }
    })
  }
}

export const deleteBlog = blogId => {
  return async dispatch => {
    await blogService.remove(blogId)
    dispatch({
      type: 'DELETE_BLOG',
      data: {
        blogId
      }
    })
  }
}

export const createComment = (blogId, newComment) => {
  return async dispatch => {
    const comment = await blogService.comment(blogId, newComment)
    dispatch({
      type: 'NEW_COMMENT',
      data: {
        blogId,
        newComment: { content: comment.content, id: comment.id }
      }
    })
  }
}

export default blogReducer