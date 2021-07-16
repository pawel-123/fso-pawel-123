import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery, useSubscription, useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { ALL_AUTHORS, ALL_BOOKS, ALL_GENRES, ME, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('')
  const [token, setToken] = useState(null)
  const [books, setBooks] = useState(null)
  const [myBooks, setMyBooks] = useState(null)
  const [genreToFilter, setGenreToFilter] = useState(null)
  const [displayedBooks, setDisplayedBooks] = useState(null)

  const booksResult = useQuery(ALL_BOOKS)
  const authorsResult = useQuery(ALL_AUTHORS)
  const genresResult = useQuery(ALL_GENRES)
  const meResult = useQuery(ME)
  const [getRecos, recosResult] = useLazyQuery(ALL_BOOKS)

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

  useEffect(() => {
    if (recosResult.data) {
      setMyBooks(recosResult.data.allBooks)
    }
  }, [recosResult])

  const getRecommendations = () => {
    if (meResult.data) {
      console.log('getting recos')
      getRecos({ variables: { genre: meResult.data.me.favoriteGenre } })
    }
  }

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(book => book.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
      window.alert(`New book "${addedBook.title}" added`)
    }
  })

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
          getRecommendations()
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
        updateCacheWith={updateCacheWith}
      />

      <Recommendations
        show={page === 'recommendations'}
        books={myBooks || []}
        favoriteGenre={meResult.data ? meResult.data.me.favoriteGenre : ''}
      />

    </div>
  )
}

export default App