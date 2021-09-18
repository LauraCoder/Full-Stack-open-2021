import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
  case 'NEW_ANECDOTE':
    return [...state, action.data]
  case 'VOTE': {
    const votedAnecdote = state.find(a => a.id === action.data.id)
    const updatedVotes = { ...votedAnecdote, votes: votedAnecdote.votes + 1 }
    return state.map(anecdote =>
      anecdote.id !== action.data.id
        ? anecdote
        : updatedVotes
    )
  }
  case 'INIT_ANECDOTES':
    return action.data
  default: return state
  }
}

export const createAnecdote = data => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.addVote({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({
      type: 'VOTE',
      data: votedAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer