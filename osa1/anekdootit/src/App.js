import React, { useState } from 'react'

// component for button elements
const Button = ({handleClick, text}) => ( 
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0)) //creating an array to save the amount of votes

  //function for getting an anecdote randomly
  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random(selected) * anecdotes.length));
  }

  //function for voting for an anecdote
  const vote = () => {
    setPoints({
      ...points,
      [selected]: points[selected] + 1,
    })
  }

  const mostVotes = Object.keys(points).sort((a, b) => points[b] - points[a])[0]; //to get the anecdote which has the most votes

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}<br/>
      <p>has {points[selected]} votes</p>
      <Button handleClick={vote} text="Vote" /> 
      <Button handleClick={nextAnecdote} text="Next anecdote" /> 
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVotes]}<br/>
      <p>has {points[mostVotes]} votes</p>
    </div>
  )
}

export default App