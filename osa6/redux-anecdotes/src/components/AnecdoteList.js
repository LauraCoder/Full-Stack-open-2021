import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, hideNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ filter, anecdote }) => {
    if ( filter === null ) {
      return anecdote
    }
    return filter === 'SET_FILTER'
     ? anecdote
     : anecdote.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const vote = (id, content) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`You voted '${content}'`))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
  }

  const sortByVotes = (a,b) => b.votes - a.votes

  return(
    <>
      {anecdotes.sort(sortByVotes).map(anecdote =>
         <Anecdote
           key={anecdote.id}
           anecdote={anecdote}
           handleClick={() => vote(anecdote.id, anecdote.content)}
         />
      )}
    </>
  )
}

export default AnecdoteList