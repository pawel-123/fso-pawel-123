import React from 'react'

const GenreButton = ({ genre, setGenreToFilter }) => {
  return (
    <button key={genre} onClick={() => setGenreToFilter(genre)}>
      {genre}
    </button>
  )
}

const GenreFilter = ({genres, setGenreToFilter}) => {
  return (
    <div>
      <button onClick={() => setGenreToFilter(null)}>ALL GENRES</button>
      {genres.map(genre => 
        <GenreButton key={genre} genre={genre} setGenreToFilter={setGenreToFilter} />
      )}
    </div>
  )
}

export default GenreFilter