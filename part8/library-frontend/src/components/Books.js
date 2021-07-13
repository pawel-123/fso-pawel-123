import React from 'react'
import GenreFilter from './GenreFilter'
import BooksTable from './BooksTable'

const Books = ({ show, books, genres, genreToFilter, setGenreToFilter }) => {
  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <p>genres: {genreToFilter || 'all'}</p>
      <GenreFilter genres={genres} setGenreToFilter={setGenreToFilter} />
      <BooksTable books={books} />
    </div>
  )
}

export default Books