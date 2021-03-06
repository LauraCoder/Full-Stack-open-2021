import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthor = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrl = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            value={title}
            id='title'
            onChange={handleTitle}
          />
        </div>
        <div>
          author
          <input
            value={author}
            id='author'
            onChange={handleAuthor}
          />
        </div>
        <div>
          url
          <input
            value={url}
            id='url'
            onChange={handleUrl}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default BlogForm