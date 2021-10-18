import React from 'react'
import useField from '../hooks'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title.value,
      author: author.value,
      url: url.value
    })

    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control
            type={title.type}
            value={title.value}
            onChange={title.onChange}
          />
          <Form.Label>author</Form.Label>
          <Form.Control
            type={author.type}
            value={author.value}
            onChange={author.onChange}
          />
          <Form.Label>url</Form.Label>
          <Form.Control
            type={url.type}
            value={url.value}
            onChange={url.onChange}
          />
          <Button variant='primary' type='submit'>create</Button>
        </Form.Group>
      </Form>
    </>
  )
}

export default BlogForm