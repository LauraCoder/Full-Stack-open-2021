import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const User = ({ user }) => {

  return !user || user.blogs.length === 0
    ? <p>No blogs created yet</p>
    : <>
      <h2>{user.username}</h2>
      <Table striped>
        <tbody>
          <tr>
            <th>added blogs</th>
          </tr>
          {user.blogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
}

export default User