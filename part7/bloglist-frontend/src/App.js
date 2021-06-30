import React, { useState, useEffect, useRef } from 'react'
import Login from './components/Login'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import ErrorBox from './components/ErrorBox'
import SuccessBox from './components/SuccessBox'
import Togglable from './components/Togglable'
import loginService from './services/login'
import blogService from './services/blogs'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { notificationError, notificationSuccess } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogs = useSelector(state => state.blogs)
  const errorMessage = useSelector(state => state.notifications.errorMessage)
  const successMessage = useSelector(state => state.notifications.successMessage)

  const newBlogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    // blogService.getAll().then(blogs =>
    //   setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    // )
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
          <NewBlogForm addBlog={addBlog} />
        </Togglable>
        <p>{user.name} logged in <button onClick={handleLogout}>Log out</button></p>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            currentUsername={user.username}
            updateBlog={() => updateBlog(blog.id)}
            removeBlog={() => removeBlog(blog.id)}
          />
        )}
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

  const addBlog = async (newObject) => {
    try {
      newBlogFormRef.current.toggleVisibility()
      // const newBlog = await blogService.create(newObject)
      // setBlogs(blogs.concat(newBlog))
      dispatch(createBlog(newObject))
      // dispatch(notificationSuccess(`Successfully added ${newBlog.title} by ${newBlog.author}`))
      dispatch(notificationSuccess('Successfully added new blog - fix this notification'))
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

  const updateBlog = (blogId) => {
    const updatedBlogs = blogs.map(blog => {
      if (blog.id === blogId) {
        blog.likes = blog.likes + 1
      }
      return blog
    })
    // setBlogs(updatedBlogs)
    console.log(updatedBlogs)
  }

  const removeBlog = (blogId) => {
    const updatedBlogs = blogs.filter(blog => blog.id !== blogId)
    // setBlogs(updatedBlogs)
    console.log(updatedBlogs)
  }

  return (
    <div>
      {errorMessage && <ErrorBox error={errorMessage} />}
      {successMessage && <SuccessBox success={successMessage} />}
      {user === null ?
        loginForm() :
        blogSection()
      }
    </div>
  )
}

export default App