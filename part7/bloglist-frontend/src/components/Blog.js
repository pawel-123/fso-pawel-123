import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const blogStyle = {
    padding: '0.5em',
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'column',
  }

  const blogLinkStyle = {
    fontStyle: 'italic',
    marginBottom: '0.5em',
    color: 'black'
  }

  const smallTextStyle = {
    fontSize: '0.7em'
  }

  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`} style={blogLinkStyle}>{blog.title}</Link>
      <span style={smallTextStyle}>Author: {blog.author}</span>
      <span style={smallTextStyle}>Likes: {blog.likes}</span>
    </div>
  )
}

export default Blog