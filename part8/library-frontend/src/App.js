import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('')
  const booksResult = useQuery(ALL_BOOKS)
  const authorsResult = useQuery(ALL_AUTHORS)

  if (booksResult.loading || authorsResult.loading) {
    return null
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        authors={authorsResult.data ? authorsResult.data.allAuthors : []}
      />

      <Books
        show={page === 'books'}
        books={booksResult.data ? booksResult.data.allBooks : []}
      />

      <NewBook
        show={page === 'add'}
        setPage={setPage}
      />

    </div>
  )
}

export default App