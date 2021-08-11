import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import CountryList from './components/CountryList'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filterCountries, setFilter ] = useState('')

  //API request for countries
  useEffect(() => {
    console.log('effect, countries')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled, countries')
        setCountries(response.data)
      })
  }, [])

  const handleFilter = (event) => setFilter(event.target.value)
  
  //filters the list of countries according to user input
  const searchedCountries = filterCountries === ""
    ? []
    : countries.filter(country => country.name.toLowerCase().includes(filterCountries.toLowerCase()))

  //when there are less than 10 matches, the list of filtered countries will be shown
  const showCountries = searchedCountries.length > 10
    ? 'Too many matches, specify another filter'
    : searchedCountries.map(country => <CountryList key={country.name} country={country} />)

  //when there's only one match, info of the country will be shown
  if (showCountries.length === 1 ) {
    return (
      <>
        <p>find countries <input value={filterCountries} onChange={handleFilter}/></p>
        <Country country={searchedCountries[0]} />
      </>
    )
  } 

  return (
    <>
      <p>find countries <input value={filterCountries} onChange={handleFilter}/></p>
      <ul>
        {showCountries}
      </ul>
    </>
  )

}

export default App