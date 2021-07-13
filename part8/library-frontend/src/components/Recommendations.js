import React from 'react'
import BooksTable from './BooksTable'

const Recommendations = ({ show, genreToFilter, books }) => {
  if (!show) {
    return null
  }
  
  return (
    <div>
      <h2>recommendations</h2>
      <p>in genre: <b>{genreToFilter}</b></p>
      <BooksTable books={books}/>
    </div>
  )
}

export default Recommendations