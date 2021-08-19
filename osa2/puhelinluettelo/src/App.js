import React, { useState, useEffect } from 'react'
import nameService from './services/persons'
import Contacts from './components/ContactList'
import Filter from './components/Filter'
import Form from './components/Form'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterNames, setFilter ] = useState('')
  const [ message, setMessage] = useState(null)

  useEffect(() => {
    nameService
      .getAll()
      .then(initialNames => {
        setPersons(initialNames)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    const person = persons.find(p => p.name.toLowerCase() === nameObject.name.toLowerCase())
    const updatedPerson = { ...person, number: nameObject.number }

    //if a name already exists in the contacts, there will be an alert. If doesn't exists, adds to contacts.
    if (persons.some(person => person.name.toLowerCase() === nameObject.name.toLowerCase())) {
      if(window.confirm(`${newName} is already added to phonebook. Would you like to replace the old number with a new one?`)){
        nameService
          .update(person.id, updatedPerson)
          .then(response => {
            setPersons(persons.map(person => person.name !== updatedPerson.name ? person : response))
            setMessage({
              text: `Number of ${newName} was updated`,
              type: "success"
            })
            setTimeout(() => {
              setMessage(null)
            }, 2000)
            console.log("Contact updated", response)
          })
          .catch(error => {
            console.log(error.response.data)
            setMessage({
              text: error.response.data.error, 
              type: "error"
            })
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
      }
    } else {
      nameService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response))
          setMessage({
            text: `${newName} was added to the phonebook`,
            type: "success"
          })
          setTimeout(() => {
            setMessage(null)
          }, 2000)
          console.log("Contact created", response)
        })
        .catch(error => {
          console.log(error.response.data)
          setMessage({
            text: error.response.data.error, 
            type: "error"
          })
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    }
    
    setNewName('')
    setNewNumber('')

  }

  const deleteName = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      nameService
        .deleteContact(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
          setMessage({
            text: `Contact ${name} was deleted`,
            type: "success"
          })
          setTimeout(() => {
            setMessage(null)
            }, 2000)
          console.log("Contact deleted", response)
        })
        .catch(error => {
          setMessage({
            text: `Note '${name}' was already removed from server`,
            type: "error"
          })
          setTimeout(() => {
            setMessage(null)
          }, 2000)
          console.error(error)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }
 
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumber = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => setFilter(event.target.value)

  //filters the list of contacts according to user input
  const contacts = filterNames === ""
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterNames.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filterNames={filterNames} handleFilter={handleFilter} />
      <h2>Add a new contact</h2>
      <Form addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumber={handleNumber} />
      <h2>Numbers</h2>
      <Contacts contacts={contacts} deleteName={deleteName}/>
    </div>
  )

}

export default App