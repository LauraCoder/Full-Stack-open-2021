import React from 'react'
import Weather from './Weather'

const Country = ({ country }) => {
    return(
        <>
            <h1>{country.name}</h1>
            <p><strong>capital</strong> {country.capital}</p>
            <p><strong>population</strong> {country.population}</p>
            <h2>Languages</h2>
            <ul>
                {country.languages.map((language, i) => <li key={i}>{language.name}</li>)}
            </ul>
            <img src={country.flag} alt={`flag of ${country.name}`} width="250"/>
            <Weather capitalWeather={country.capital} />
        </>
    )
}

export default Country