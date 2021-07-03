import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = async () => {
    dispatch(likeBlog(blog.id))
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className="blog-post" style={blogStyle}>
      {blog.title} - {blog.author}
      {showDetails ?
        <>
          <button onClick={toggleDetails}>hide details</button>
          <br />{blog.url}
          <br />Likes: <span className='likes-number'>{blog.likes}</span> <button className='like-button' onClick={handleLike}>like</button>
          <br />{blog.author}
          <br />
          {blog.user && blog.user.username === user.username &&
            <button className='delete-button' onClick={handleDelete}>delete blog</button>
          }
        </> :
        <button onClick={toggleDetails}>show details</button>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog