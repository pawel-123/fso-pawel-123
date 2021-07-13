import React, { useEffect, useState } from 'react'
import { useQuery, useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('')
  const [token, setToken] = useState(null)

  const booksResult = useQuery(ALL_BOOKS)
  const authorsResult = useQuery(ALL_AUTHORS)

  const client = useApolloClient()

  useEffect(() => {
    const existingToken = localStorage.getItem('library-user-token')
    if (existingToken) {
      setToken(existingToken)
    }
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('login')
  }

  if (booksResult.loading || authorsResult.loading) {
    return null
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { !token && <button onClick={() => setPage('login')}>login</button> }
        { token && <button onClick={() => setPage('add')}>add book</button> }
        { token && <button onClick={logout}>logout</button>}
      </div>

      <Authors
        show={page === 'authors'}
        authors={authorsResult.data ? authorsResult.data.allAuthors : []}
      />

      <Books
        show={page === 'books'}
        books={booksResult.data ? booksResult.data.allBooks : []}
      />

      <LoginForm 
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />

      <NewBook
        show={page === 'add'}
        setPage={setPage}
      />

    </div>
  )
}

export default App