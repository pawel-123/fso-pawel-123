import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './Search'
import Countries from './Countries'

const App = () => {
    const [newSearch, setNewSearch] = useState('')
    const [countries, setCountries] = useState([])
    const [shownCountries, setShownCountries] = useState([])

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    useEffect(() => {
        setShownCountries(countries.filter(country => country.name.toLowerCase().includes(newSearch.toLowerCase())))
    }, [newSearch, countries])

    return (
        <div>
            <Search newSearch={newSearch} setNewSearch={setNewSearch} />
            <Countries shownCountries={shownCountries} setNewSearch={setNewSearch} />
        </div>
    );
}

export default App;
