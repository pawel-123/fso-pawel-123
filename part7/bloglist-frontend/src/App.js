import React, { useState, useEffect, useRef } from 'react'
import Login from './components/Login'
import Blogs from './components/Blogs'
import NewBlogForm from './components/NewBlogForm'
import ErrorBox from './components/ErrorBox'
import SuccessBox from './components/SuccessBox'
import Togglable from './components/Togglable'
import loginService from './services/login'
import blogService from './services/blogs'
import { initializeBlogs } from './reducers/blogReducer'
import { notificationError, notificationSuccess } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const newBlogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin} />
    </div>
  )

  const blogSection = () => {
    return (
      <div>
        <h2>blogs</h2>
        <Togglable buttonLabel='new blog form' ref={newBlogFormRef}>
          <NewBlogForm />
        </Togglable>
        <p>{user.name} logged in <button onClick={handleLogout}>Log out</button></p>
        {/* {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            currentUsername={user.username}
            updateBlog={() => updateBlog(blog.id)}
            removeBlog={() => removeBlog(blog.id)}
          />
        )} */}
        <Blogs />
      </div>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(notificationSuccess('successfully logged in'))
      setTimeout(() => {
        dispatch(notificationSuccess(null))
      }, 5000)
    } catch (err) {
      dispatch(notificationError('wrong credentials'))
      setTimeout(() => {
        dispatch(notificationError(null))
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  // const updateBlog = (blogId) => {
  //   const updatedBlogs = blogs.map(blog => {
  //     if (blog.id === blogId) {
  //       blog.likes = blog.likes + 1
  //     }
  //     return blog
  //   })
  //   // setBlogs(updatedBlogs)
  //   console.log(updatedBlogs)
  // }

  // const removeBlog = (blogId) => {
  //   const updatedBlogs = blogs.filter(blog => blog.id !== blogId)
  //   // setBlogs(updatedBlogs)
  //   console.log(updatedBlogs)
  // }

  return (
    <div>
      <ErrorBox />
      <SuccessBox />
      {user === null ?
        loginForm() :
        blogSection()
      }
    </div>
  )
}

export default App