import React from 'react'
import BooksTable from './BooksTable'

const Recommendations = ({ show, favoriteGenre, books }) => {  
  if (!show) {
    return null
  }
  
  return (
    <div>
      <h2>recommendations</h2>
      <p>in genre: <b>{favoriteGenre}</b></p>
      <BooksTable books={books}/>
    </div>
  )
}

export default Recommendations