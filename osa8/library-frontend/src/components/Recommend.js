import React from 'react'
import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

const Recommend = ({ show }) => {
  const resultMe = useQuery(ME)
  const resultBooks = useQuery(ALL_BOOKS)

  if (!show) {
    return null
  }
  if (resultMe.loading || resultBooks.loading)  {
    return <div>loading...</div>
  }

  const user = resultMe.data.me
  const books = resultBooks.data.allBooks || []
  const filterBooks = books.filter(b => b.genres.includes(user.favoriteGenre))

  return (
    <div>
      <h2>recommendations</h2>
      <table>
        <tbody>
          <tr>
            <th>books in your favourite genre</th>
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
    </div>
  )
}

export default Recommend