import React from 'react'
import { useDispatch } from 'react-redux'
import { createComment } from '../reducers/blogReducer'

const BlogComments = ({ blog }) => {
  const dispatch = useDispatch()

  const addComment = event => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(createComment(blog.id, { content }))
  }

  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input type="text" name="content" />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map(comment => <li key={comment.id}>{comment.content}</li>)}
      </ul>
    </div>
  )
}

export default BlogComments