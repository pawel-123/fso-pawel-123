import React from 'react'

const Login = ({ username, setUsername, password, setPassword, handleLogin }) => {
  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="username">username</label>
      <input type="text" id="username" name="username" value={username} onChange={(event) => setUsername(event.target.value)} />
      <br />
      <label htmlFor="password">password</label>
      <input type="password" id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      <br />
      <button id="login-button" type="submit">Login</button>
    </form>
  )
}

export default Login