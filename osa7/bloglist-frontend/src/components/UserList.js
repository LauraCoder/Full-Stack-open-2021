import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const SingleUser = ({ user }) => {
  return (
    <>
      <tr key={user.id}>
        <td>
          <Link to={`/users/${user.id}`}>{user.username}</Link>
        </td>
        <td>
          {user.blogs.length}
        </td>
      </tr>
    </>
  )
}

const Users = () => {
  const users = useSelector(state => state.users)

  const getUsers = users.map(user =>
    <SingleUser key={user.id} user={user}/>
  )

  return (
    <>
      <h2>users</h2>
      <Table striped className='userList'>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {getUsers}
        </tbody>
      </Table>
    </>
  )
}

export default Users