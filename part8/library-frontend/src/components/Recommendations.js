import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import BooksTable from './BooksTable'
import { ME, ALL_BOOKS } from '../queries'

const Recommendations = ({ show, genreToFilter, books }) => {
  const meResult = useQuery(ME)
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)
  const [recBooks, setRecBooks] = useState([])
  const [myGenre, setMyGenre] = useState('')

  useEffect(() => {
    if (meResult.data) {
      setMyGenre(meResult.data.me.favoriteGenre)
      getBooks({ variables: { genre: myGenre } })
    }
  }, [meResult, myGenre])

  useEffect(() => {
    if (result.data) {
      setRecBooks(result.data.allBooks)
    }
  }, [result])
  
  if (!show) {
    return null
  }
  
  return (
    <div>
      <h2>recommendations</h2>
      <p>in genre: <b>{myGenre}</b></p>
      <BooksTable books={recBooks}/>
    </div>
  )
}

export default Recommendations