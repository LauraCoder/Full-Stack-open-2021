import React, { useState } from 'react'
import { useApolloClient, useSubscription, useLazyQuery } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import EditAuthor from './components/EditAuthor'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'

import { ALL_BOOKS, BOOK_ADDED } from './queries'


const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const [getBooks, result] = useLazyQuery(ALL_BOOKS);
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(b => b.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token 
          ? <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommend')}>recommend</button>
              <button onClick={logout}>logout</button>
            </>
          : <button onClick={() => setPage('login')}>login</button>
        }
      </div>
      
      <Notify errorMessage={errorMessage} />
      <Authors show={page === 'authors'} setError={notify} />
      <Books show={page === 'books'} getBooks={getBooks} result={result} />
      {token
        ? <>
          <NewBook
            show={page === 'add'}
            setError={notify}
            updateCacheWith={updateCacheWith}
            setPage={setPage}
            getBooks={getBooks}
          />
          <EditAuthor show={page === 'authors'} setError={notify} />
          <Recommend show={page === 'recommend'} />
          </>
        : null
      }
      <LoginForm
        show={page === 'login'}
        setPage={setPage}
        setToken={setToken}
        setError={notify}
      />
    </div>
  )
}

export default App