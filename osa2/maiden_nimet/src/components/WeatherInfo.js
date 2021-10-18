import React from 'react'

const WeatherInfo = ({ weather }) => {
    return (
      <>
        <h2>Weather in {weather.location.name}</h2>
        <p><strong>Temperature:</strong> {weather.current.temperature} &deg; Celcius</p>
        <img src={weather.current.weather_icons} alt="weather icon" width="100"/>
        <p><strong>Wind:</strong> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
      </>
    )
}

export default WeatherInfo