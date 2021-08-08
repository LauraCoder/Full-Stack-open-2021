import React from 'react'

//renders a line for the contact list
const Name = ({ person, deleteName }) => {
    return (
      <li>{person.name} {person.number} <button onClick={() => deleteName(person.id, person.name)}>delete</button></li>
    )
  }
  
//renders the list of contacts
const Contacts = ({ contacts, deleteName }) => {
    return (
      <ul>
        {contacts.map(person => <Name key={person.id} person={person} deleteName={deleteName}/>)}
      </ul>
    )
  }

export default Contacts