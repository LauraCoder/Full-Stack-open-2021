import React from 'react'

  // formats a single course
  const Course = ({ course }) => {
    return (
      <>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </>
    )
  }
  
  // renders the name of the course
  const Header = ({ course }) => {
    return (
      <>
        <h1>{course.name}</h1>
      </>
    )
  }
  
  // renders a part and exercises
  const Part = ({ part }) => {
    return (
      <>
        <p>
          {part.name} {part.exercises}
        </p>
      </>
    )
  }
  
  // renders the parts and their number of exercises
  const Content = ({ parts }) => {
    return (
      <>
        {parts.map((part) => (
          <Part key={part.id} part={part} />          
        ))}
      </>
    )
  }
  
  // renders the total number of exercises of a course
  const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  
    return (
      <>
        <b>Total of {total} exercises</b>
      </>
    )
  }

export default Course