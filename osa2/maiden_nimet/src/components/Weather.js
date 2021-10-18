import React, { useState, useEffect } from 'react'
import axios from 'axios'
import WeatherInfo from './WeatherInfo'

const Weather = ({ capitalWeather }) => {
    const [ weather, setWeather ] = useState([])
    const [ hasWeather, setHasWeather ] = useState(false)
  
    //API request for weather
    useEffect(() => {
      console.log('effect, weather')
      const baseUrl = "http://api.weatherstack.com/current"
      const access_key = process.env.REACT_APP_API_KEY
  
      axios
        .get(`${baseUrl}?access_key=${access_key}&query=${capitalWeather}`)
        .then(response => {
          setWeather(response.data)
          setHasWeather(true)
          console.log('promise fulfilled, weather')
        })
    }, [capitalWeather])
  
    return (
        <>
            {hasWeather && <WeatherInfo weather={weather} />}
        </>
    )
}

export default Weather