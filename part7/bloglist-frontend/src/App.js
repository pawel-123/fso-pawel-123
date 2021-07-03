import React, { useState, useEffect, useRef } from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Users from './components/Users'
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

  const newBlogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setUser())
    console.log('user in useEffect :', user)
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
        <p>{user.name} logged in <button onClick={handleLogout}>Log out</button></p>
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

  console.log('user just before return :', user)

  return (
    <div>
      <div>
        <Link to='/'>Blogs</Link>
        <Link to='/login'>Login</Link>
        <Link to='/users'>Users</Link>
      </div>
      <ErrorBox />
      <SuccessBox />

      <Switch>
        <Route path='/login'>
          {user ? <Redirect to='/' /> : loginSection()}
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/'>
          {user === null ? <Redirect to='/login' /> : blogSection()}
        </Route>
      </Switch>
    </div>
  )
}

export default App