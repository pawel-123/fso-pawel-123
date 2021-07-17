import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, LOGIN, ME } from '../queries'

const LoginForm = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const [login, result] = useMutation(LOGIN, {
    refetchQueries: [ {query: ALL_BOOKS}, {query: ALL_AUTHORS}, {query: ME} ]
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()

    await login({ variables: { username, password } })
    setUsername('')
    setPassword('')
    const currentUrl = window.location.href
    window.location.href = currentUrl
  }

  if (!show) {
    return null
  }

  return (
    <form onSubmit={submit}>
      <div>
        username
        <input 
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password' 
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

export default LoginForm