import React, { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const Blog = ({ blog, currentUsername, updateBlog, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = async () => {
    updateBlog()
    await blogService.like(blog.id, blog.likes + 1)
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      removeBlog()
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
          {blog.user && blog.user.username === currentUsername &&
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
  currentUsername: PropTypes.string.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog