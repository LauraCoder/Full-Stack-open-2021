import React from 'react'

//renders the form for adding new contact
const Form = ({ addName, newName, handleNameChange, newNumber, handleNumber }) => {
    return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    )
  }

export default Form