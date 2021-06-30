import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

test('<NewBlogForm /> calls event handler from props with the right details when a new blog is created', () => {
  const addBlog = jest.fn()

  const component = render(
    <NewBlogForm addBlog={addBlog} />
  )

  const form = component.container.querySelector('form')
  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')

  expect(form).toBeDefined()
  expect(titleInput).toBeDefined()
  expect(authorInput).toBeDefined()
  expect(urlInput).toBeDefined()

  fireEvent.change(titleInput, {
    target: { value: 'First blog post ever' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'John Doe' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'http://blogblogblog.com' }
  })

  fireEvent.submit(form)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('First blog post ever')
  expect(addBlog.mock.calls[0][0].author).toBe('John Doe')
  expect(addBlog.mock.calls[0][0].url).toBe('http://blogblogblog.com')
})