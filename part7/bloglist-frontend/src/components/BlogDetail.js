import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const BlogDetail = ({ blog }) => {
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()
  const history = useHistory()

  const handleLike = async () => {
    dispatch(likeBlog(blog.id))
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
    }
    history.push('/')
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (!blog) {
    return null
  }

  return (
    <div className="blog-post" style={blogStyle}>
      <h2>{blog.title} - {blog.author}</h2>
      <ul>
        <li>{blog.url}</li>
        <li>
          {blog.likes} likes
          <button className='like-button' onClick={handleLike}>like</button>
        </li>
        <li>added by {blog.user.name}</li>
        {blog.user && blog.user.username === user.username &&
          <li><button className='delete-button' onClick={handleDelete}>delete blog</button></li>
        }
      </ul>
    </div>
  )
}

export default BlogDetail