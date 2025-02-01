const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')


describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'User Tester',
        username: 'username',
        password: 'password'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('Log in to application')
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'username', 'password')
      await expect(page.getByText('blogs')).toBeVisible()
    })
    
    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'username', 'wrong')

      await page.getByRole('button', { name: 'login' }).click()

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

      await expect(page.getByText('User Tester logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
        await loginWith(page, 'username', 'password')
    })
  
    test('a new blog can be created', async ({ page }) => {
        await createBlog(page, 'new title', 'new author', 'new url')

        await expect(page.getByText('a new blog new title by new author added')).toBeVisible()

        const blogDiv = await page.locator('.blog')
        await expect(blogDiv).toContainText('new title new author')
    })
  })

  describe('When a blog exists', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'username', 'password')
      await createBlog(page, 'test title', 'test author', 'test url')
    })

    test('a blog can be liked', async ({ page }) => {
        const blogDiv = await page.locator('.blog')

        await blogDiv.getByRole('button', { name: 'view' }).click()
        await blogDiv.getByRole('button', { name: 'like' }).click()
    })
  })
})