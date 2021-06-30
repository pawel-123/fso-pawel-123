import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { notificationError, notificationSuccess } from '../reducers/notificationReducer'

const NewBlogForm = () => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = async (newObject) => {
    try {
      // this doesn't work currently
      // newBlogFormRef.current.toggleVisibility()
      dispatch(createBlog(newObject))
      dispatch(notificationSuccess(`Successfully added ${newObject.title} by ${newObject.author}`))
      setTimeout(() => {
        dispatch(notificationSuccess(null))
      }, 5000)
    } catch (error) {
      dispatch(notificationError('Couldn\'t add the blog'))
      setTimeout(() => {
        dispatch(notificationError(null))
      }, 5000)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    addBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">title</label>
      <input
        type="text"
        id="title"
        name="title"
        value={newTitle}
        onChange={(event) => { setNewTitle(event.target.value) }}
      />
      <br />
      <label htmlFor="author">author</label>
      <input
        type="text"
        id="author"
        name="author"
        value={newAuthor}
        onChange={(event) => { setNewAuthor(event.target.value) }}
      />
      <br />
      <label htmlFor="url">url</label>
      <input
        type="text"
        id="url"
        name="url"
        value={newUrl}
        onChange={(event) => { setNewUrl(event.target.value) }}
      />
      <br />
      <button type="submit">Add blog</button>
    </form>
  )
}

export default NewBlogForm