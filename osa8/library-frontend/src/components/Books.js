import React, { useEffect, useState } from 'react'

const Books = ({ show, getBooks, result }) => {
  const [ filterGenres, setFilter ] = useState('')

  useEffect(() => {
    getBooks()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  const books = result.data.allBooks || []

  const findGenre = () => {
    var getGenres = []
    books.forEach(book => {
      book.genres.forEach(genre => {
        if (getGenres.indexOf(genre) === -1) {
          getGenres.push(genre)
        }
      })
    })
    return getGenres
  }

  const handleFilter = (event) => setFilter(event.target.value)

  const filterBooks = filterGenres === '' || filterGenres === 'allGenres'
    ? books
    : books.filter((b) => b.genres.indexOf(filterGenres) !== -1)

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filterBooks.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <button value='allGenres' onClick={handleFilter}>All genres</button>
      {findGenre().map(genre => 
        <button key={genre} value={genre} onClick={handleFilter}>{genre}</button>
      )}
    </div>
  )
}

export default Books