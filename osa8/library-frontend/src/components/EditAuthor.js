import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Select from 'react-select'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const EditAuthor = ({show, setError}) => {
  const getAuthors = useQuery(ALL_AUTHORS)

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [editAuthor, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError('author not found')
    }
  }, [result.data])  // eslint-disable-line

  if (!show) {
    return null
  } 

  if (getAuthors.loading)  {
    return <div>loading...</div>
  }

  const authors = getAuthors.data.allAuthors || []

  const options = authors.map(author => {
    return {
      value: author.name,
      label: author.name,
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    
    console.log('update author...')
    editAuthor({  variables: { name, born } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <Select 
            value={({ label: name, value: name })} 
            onChange={({ value }) => setName(value)} 
            options={options} 
          />
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default EditAuthor