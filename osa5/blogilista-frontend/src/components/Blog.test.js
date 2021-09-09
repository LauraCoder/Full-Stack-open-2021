import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogList from './BlogList'
import BlogForm from './BlogForm'

let component
let mockHandler

beforeEach(() => {
  const blog = {
    title: 'Test Blog',
    author: 'Blogger',
    url: 'testblog.com',
    likes: 4,
    user: 'blogger'
  }

  const user = {
    username: 'blogger'
  }

  let deleteBlog

  mockHandler = jest.fn()

  component = render(
    <BlogList blog={blog} addLikes={mockHandler} deleteBlog={deleteBlog} user={user}/>
  )
})

test('renders title and author', () => {
  const div = component.container.querySelector('.blogHeader')
  expect(div).toHaveTextContent(
    'Test Blog - Blogger'
  )
})

test('renders url and likes when show button is clicked', () => {
  const button = component.getByText('show')
  fireEvent.click(button)

  const div = component.container.querySelector('.blogInfo')

  expect(div).toHaveTextContent(
    'testblog.com'
  )
  expect(div).toHaveTextContent(
    '4'
  )
})

test('if like button is clicked twice, the event handler should be called twice', () => {
  const button = component.getByText('show')
  fireEvent.click(button)

  const likeBlog = component.getByText('like')
  fireEvent.click(likeBlog)
  fireEvent.click(likeBlog)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')


  fireEvent.change(title, {
    target: { value: 'Test Blog' }
  })
  fireEvent.change(author, {
    target: { value: 'Blogger' }
  })
  fireEvent.change(url, {
    target: { value: 'testblog.com' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Test Blog')
  expect(createBlog.mock.calls[0][0].author).toBe('Blogger')
  expect(createBlog.mock.calls[0][0].url).toBe('testblog.com')
})