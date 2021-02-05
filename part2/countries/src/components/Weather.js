import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
    const [weather, setWeather] = useState({})

    useEffect(() => {
        const access_key = process.env.REACT_APP_ACCESS_KEY
        axios
            .get(`http://api.weatherstack.com/current?access_key=${access_key}&query=${country.capital}`)
            .then(response => {
                setWeather(response.data)
            })
    }, [country])

    return (
        <div>
            <h2>Weather in {country.capital}</h2>
            {weather.current &&
                <div>
                    <p><b>temperature:</b> {weather.current.temperature} Celcius</p>
                    <img src={weather.current.weather_icons[0]} alt={`Weather icon in ${country.capital}`} />
                    <p><b>wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
                </div>
            }
        </div>
    )
}

export default Weather