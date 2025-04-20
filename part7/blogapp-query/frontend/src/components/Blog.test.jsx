import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'
import Blog from './Blog'

describe('<Blog />', () => {
    let container
    const blog = {
      id: '1',
      title: 'blog title',
      author: 'blog author',
      url: 'www.blogurl.com',
      likes: 6,
      user: { id: '12', name: 'user' }
    }

    const mockHandler = vi.fn()
  
    beforeEach(() => {
      container = render(
        <Blog 
          blog={blog}
          user={{ id: '123' }}
          setBlogs={() => {}} 
          deleteBlog={() => {}}
          addLike={mockHandler}
        />
      ).container
    })
  
    test('renders title and author, but not url and likes by default', () => {
        const div = container.querySelector('.blog')
        expect(div).toHaveTextContent('blog title')
        expect(div).toHaveTextContent('blog author')
        
        const hiddenDiv = container.querySelector('div[style="display: none;"]')
        expect(hiddenDiv).toBeDefined()
        expect(hiddenDiv).toHaveTextContent('www.blogurl.com')
        expect(hiddenDiv).toHaveTextContent('6')
    })

    test('url and likes are shown when the view button is clicked', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)
        
        const url = screen.getByText('www.blogurl.com')
        const likes = screen.getByText('6')
    
        expect(url).toBeDefined()
        expect(likes).toBeDefined()
        expect(url).toBeVisible()
        expect(likes).toBeVisible()
    })
})