import React, { useState } from 'react'
import Country from './Country'

const CountryList = ({ country }) => {
    const [ show, setShow ] = useState(false);
  
    const handleClick = () => setShow(!show)
  
    //Clicking button will either show or hide information of a country
    if (show) {
      return (
        <>
            <Country country={country}/> 
            <button onClick={handleClick}>
             {show ? 'hide' : 'show' }
            </button>
        </>
      )
    }
  
    //If button is not clicked, only the list of filtered countries will be shown
    return (
        <>
            <li>
                {country.name} 
                <button onClick={handleClick}>
                 {show ? 'hide' : 'show' }
                </button>
            </li>
        </>
    )
}

export default CountryList