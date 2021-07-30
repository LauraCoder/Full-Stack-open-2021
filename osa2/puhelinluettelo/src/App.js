import React, { useState, useEffect } from 'react'
import axios from 'axios'

//renders the filtering input field
const Filter = ({ filterNames, handleFilter }) => {
  return (
    <div>
      Filter contacts with: 
      <input value={filterNames} onChange={handleFilter}/>
    </div>
  )
}

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

//renders a line for the contact list
const Name = ({ person }) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

//renders the list of contacts
const Contacts = ({ contacts }) => {
  return (
    <ul>
      {contacts.map(person => <Name key={person.name} person={person} />)}
    </ul>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterNames, setFilter ] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    //if a name already exists in the contacts, there will be an alert. If doesn't exists, adds to contacts.
    if (persons.some(person => person.name === nameObject.name)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(nameObject))
    }
    
    setNewName('')
    setNewNumber('')
  }
 
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
 
  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }
 
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  //filters the list of contacts according to user input
  const contacts = filterNames === ""
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterNames.toLowerCase()))
    
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterNames={filterNames} handleFilter={handleFilter} />
      <h2>Add a new contact</h2>
      <Form addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumber={handleNumber} />
      <h2>Numbers</h2>
      <Contacts contacts={contacts} />
    </div>
  )

}

export default App