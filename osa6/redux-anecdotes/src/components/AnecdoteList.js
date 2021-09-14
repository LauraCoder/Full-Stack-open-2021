import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

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
  const anecdotes = useSelector(state => state)

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
  }

  const sortByVotes = (a,b) => b.votes - a.votes

  return(
    <>
      {anecdotes.sort(sortByVotes).map(anecdote =>
         <Anecdote
           key={anecdote.id}
           anecdote={anecdote}
           handleClick={() => vote(anecdote.id)}
         />
      )}
    </>
  )
}

export default AnecdoteList