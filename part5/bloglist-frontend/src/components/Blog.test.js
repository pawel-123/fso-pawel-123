import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let mockUsername
  let mockUpdate
  let mockRemove

  beforeEach(() => {
    const blog = {
      title: 'Blog post for the purpose of testing',
      author: 'Pawel Admin',
      url: 'http://fakeurl.com',
      likes: 7
    }
    mockUsername = 'pawel_admin'
    mockUpdate = jest.fn()
    mockRemove = jest.fn()

    component = render(
      <Blog
        blog={blog}
        currentUsername={mockUsername}
        updateBlog={mockUpdate}
        removeBlog={mockRemove}
      />
    )
  })

  test('does initially render blog title and author', () => {
    expect(component.container).toHaveTextContent(
      'Blog post for the purpose of testing'
    )
    expect(component.container).toHaveTextContent(
      'Pawel Admin'
    )
  })

  test('does not initially render blog likes and url', () => {
    expect(component.container).not.toHaveTextContent(
      'http://fakeurl.com'
    )
    expect(component.container).not.toHaveTextContent(
      'Likes: 7'
    )
  })

  test('blog url and likes are shown after show details button is clicked', () => {
    const button = component.getByText('show details')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'http://fakeurl.com'
    )
    expect(component.container).toHaveTextContent(
      'Likes: 7'
    )
  })

  test('like button event handler is called twice when it is clicked twice', () => {
    const detailButton = component.getByText('show details')
    fireEvent.click(detailButton)

    const likeButton = component.container.querySelector('.likeButton')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockUpdate.mock.calls).toHaveLength(2)
  })
})