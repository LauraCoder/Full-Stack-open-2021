import React from 'react'

//renders the filtering input field
const Filter = ({ filterNames, handleFilter }) => {
    return (
      <div>
        Filter contacts with: 
        <input value={filterNames} onChange={handleFilter}/>
      </div>
    )
  }

export default Filter