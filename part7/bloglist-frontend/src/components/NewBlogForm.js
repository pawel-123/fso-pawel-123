import React, { useState } from 'react'

const NewBlogForm = ({ addBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

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