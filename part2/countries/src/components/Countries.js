import React from 'react'
import Country from './Country'
import Weather from './Weather'

const Countries = ({ shownCountries, setNewSearch }) => {
    if (shownCountries.length >= 10) {
        return <p>Too many matches, specify another search term</p>
    } else if (shownCountries.length === 1) {
        return (
            <div>
                <Country country={shownCountries[0]} />
                <Weather country={shownCountries[0]} />
            </div>
        )
    } else if (shownCountries.length === 0) {
        return <p>No countries found, specify another search term</p>
    } else {
        return (
            <div>
                {shownCountries.map(country => (
                    <div key={country.alpha3Code}>
                        {country.name}<button onClick={() => setNewSearch(country.name)}>show</button>
                    </div>
                ))}
            </div>
        )
    }
}

export default Countries