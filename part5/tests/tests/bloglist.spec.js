const { test, expect, beforeEach, describe } = require('@playwright/test')

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
      await page.getByTestId('username').fill('username')
      await page.getByTestId('password').fill('password')
      
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('blogs')).toBeVisible()
    })
    
    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('username')
      await page.getByTestId('password').fill('wrongpassword')
        
      await page.getByRole('button', { name: 'login' }).click()

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')
    })
  })
})