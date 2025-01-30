import { render, screen } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'
import userEvent from '@testing-library/user-event'

test('<NewBlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  const { container } = render(<NewBlogForm createBlog={createBlog} />)

  const titleInput = container.querySelector('#title-input')
  const authorInput = container.querySelector('#author-input')
  const urlInput = container.querySelector('#url-input')

  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'title test')
  await user.type(authorInput, 'author test')
  await user.type(urlInput, 'url test')

  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog).toHaveBeenCalledWith({
    title: 'title test',
    author: 'author test',
    url: 'url test',
  })
})