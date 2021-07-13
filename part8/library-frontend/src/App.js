import React, { useEffect, useState } from 'react'
import { useQuery, useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { ALL_AUTHORS, ALL_BOOKS, ALL_GENRES } from './queries'

const App = () => {
  const [page, setPage] = useState('')
  const [token, setToken] = useState(null)
  const [books, setBooks] = useState(null)
  const [genreToFilter, setGenreToFilter] = useState(null)
  const [displayedBooks, setDisplayedBooks] = useState(null)

  const booksResult = useQuery(ALL_BOOKS)
  const authorsResult = useQuery(ALL_AUTHORS)
  const genresResult = useQuery(ALL_GENRES)
  // const meResult = useQuery(ME)

  const client = useApolloClient()

  useEffect(() => {
    const existingToken = localStorage.getItem('library-user-token')
    if (existingToken) {
      setToken(existingToken)
    }
  }, [])

  useEffect(() => {
    if (booksResult.data) {
      setBooks(booksResult.data.allBooks)
    }
  }, [booksResult])

  useEffect(() => {
    if (genreToFilter) {
      const filteredBooks = genreToFilter 
        ? books.filter(book => book.genres.includes(genreToFilter)) 
        : books
      setDisplayedBooks(filteredBooks)
    }
  }, [genreToFilter, books])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('login')
  }

  if (booksResult.loading || authorsResult.loading || genresResult.loading) {
    return null
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => {
          setGenreToFilter(null)
          setPage('books')
        }}>books</button>
        { !token && <button onClick={() => setPage('login')}>login</button> }
        { token && <button onClick={() => setPage('add')}>add book</button> }
        { token && <button onClick={() => {
          // setGenreToFilter(meResult.data ? meResult.data.me.favoriteGenre : null)
          setPage('recommendations')
        }}>recommendations</button> }
        { token && <button onClick={logout}>logout</button>}
      </div>

      <Authors
        show={page === 'authors'}
        authors={authorsResult.data ? authorsResult.data.allAuthors : []}
      />

      <Books
        show={page === 'books'}
        books={genreToFilter ? displayedBooks : books}
        genres={genresResult.data ? genresResult.data.allGenres : []}
        genreToFilter={genreToFilter}
        setGenreToFilter={setGenreToFilter}
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

      <Recommendations
        show={page === 'recommendations'}
        books={displayedBooks || []}
        genreToFilter={genreToFilter}
      />

    </div>
  )
}

export default App