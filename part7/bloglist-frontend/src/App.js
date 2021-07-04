import React, { useState, useEffect, useRef } from 'react'
import { Switch, Route, Link, Redirect, useRouteMatch } from 'react-router-dom'
import Login from './components/Login'
import Blogs from './components/Blogs'
import BlogDetail from './components/BlogDetail'
import Users from './components/Users'
import User from './components/User'
import NewBlogForm from './components/NewBlogForm'
import ErrorBox from './components/ErrorBox'
import SuccessBox from './components/SuccessBox'
import Togglable from './components/Togglable'
import loginService from './services/login'
import { setUser, removeUser } from './reducers/userReducer'
import { notificationError, notificationSuccess } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  const userMatch = useRouteMatch('/users/:id')
  const selectedUser = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  const newBlogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setUser())
  }, [])

  const loginSection = () => (
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
          <NewBlogForm newBlogFormRef={newBlogFormRef}/>
        </Togglable>
        <Blogs />
      </div>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      dispatch(setUser())
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
    dispatch(removeUser())
  }

  return (
    <div>
      <nav>
        <Link to='/'>Blogs</Link>
        <Link to='/users'>Users</Link>
        {user
          ? <span>{user.name} logged in<button onClick={handleLogout}>Log out</button></span>
          : <Link to='/login'>Login</Link>
        }
      </nav>
      <ErrorBox />
      <SuccessBox />

      <Switch>
        <Route path='/users/:id'>
          <User user={selectedUser}/>
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/blogs/:id'>
          <BlogDetail blog={blog}/>
        </Route>
        <Route path='/login'>
          {user ? <Redirect to='/' /> : loginSection()}
        </Route>
        <Route path='/'>
          {user === null ? <Redirect to='/login' /> : blogSection()}
        </Route>
      </Switch>
    </div>
  )
}

export default App