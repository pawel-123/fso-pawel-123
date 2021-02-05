import React from 'react'

const Search = ({ newSearch, setNewSearch }) => {
    return (
        <form>
            find countries
            <input value={newSearch} onChange={event => setNewSearch(event.target.value)} />
        </form>
    )
}

export default Search