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
      <h2 style={headerStyle}>Log in to application</h2>
      <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin} />
    </div>
  )

  const blogSection = () => {
    return (
      <div>
        <h2 style={headerStyle}>blogs</h2>
        <Togglable buttonLabel='new blog form' ref={newBlogFormRef} buttonStyle={buttonStyle}>
          <NewBlogForm newBlogFormRef={newBlogFormRef} buttonStyle={buttonStyle}/>
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

  const rootStyle = {
    backgroundColor: '#E5E7EB',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    display: 'flex',
    flexDirection: 'column'
  }

  const navStyle = {
    backgroundColor: '#FDE68A',
    display: 'flex',
    padding: '0.5em 1em',
    alignItems: 'center'
  }

  const navItemStyle = {
    padding: '0 0.5em',
    textDecoration: 'none',
    color: 'black',
  }

  const userStyle = {
    marginLeft: 'auto',
    fontSize: '0.75rem'
  }

  const buttonStyle = {
    backgroundColor: '#34D399',
    color: 'white',
    padding: '0.5em 1em',
    fontWeight: 'bold',
    border: 'none',
    margin: '0 1em',
    maxWidth: '200px',
    alignSelf: 'center'
  }

  const headerStyle = {
    fontSize: '1.5 em',
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }

  return (
    <div style={rootStyle}>
      <nav style={navStyle}>
        <Link to='/' style={navItemStyle}>Blogs</Link>
        <Link to='/users' style={navItemStyle}>Users</Link>
        {user
          ? <span style={userStyle}>{user.name} logged in<button style={buttonStyle} onClick={handleLogout}>Log out</button></span>
          : <Link to='/login' style={userStyle}>Login</Link>
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