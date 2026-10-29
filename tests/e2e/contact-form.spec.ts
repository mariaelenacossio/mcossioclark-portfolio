import { test, expect } from '@playwright/test'
import { mockEmailJS } from './mocks'

/**
 * Covers item 3. EmailJS is mocked via route interception in every test
 * here (mockEmailJS) - no real email is ever sent.
 */
test.describe('Contact form', () => {
  test('empty submit shows validation errors', async ({ page }) => {
    await page.goto('/#contact')
    await page.getByRole('button', { name: 'Send it' }).click()

    await expect(page.getByText('Name is required.')).toBeVisible()
    await expect(page.getByText('Email is required.')).toBeVisible()
    await expect(page.getByText('Message needs at least 10 characters.')).toBeVisible()
    // Focus moves to the first invalid field.
    await expect(page.locator('#name')).toBeFocused()
  })

  test('success state shows "Sent" with the check icon', async ({ page }) => {
    await mockEmailJS(page, 'success')
    await page.goto('/#contact')

    await page.getByLabel('Name *').fill('Test User')
    await page.getByLabel('Email *').fill('test@example.com')
    await page.getByLabel('Message *').fill('This is a mocked test message, well over ten characters.')
    await page.getByRole('button', { name: 'Send it' }).click()

    const sentButton = page.getByRole('button', { name: 'Sent' })
    await expect(sentButton).toBeVisible({ timeout: 5000 })
    await expect(sentButton.locator('svg')).toBeVisible()

    // After the component's 3s hold, it swaps to the full confirmation panel.
    await expect(page.getByText("Sent. I'll get back to you soon.")).toBeVisible({ timeout: 5000 })
  })

  test('error state shows "Try again"', async ({ page }) => {
    await mockEmailJS(page, 'error')
    await page.goto('/#contact')

    await page.getByLabel('Name *').fill('Test User')
    await page.getByLabel('Email *').fill('test@example.com')
    await page.getByLabel('Message *').fill('This is a mocked test message, well over ten characters.')
    await page.getByRole('button', { name: 'Send it' }).click()

    await expect(page.getByRole('button', { name: 'Try again' })).toBeVisible({ timeout: 5000 })
    await expect(page.getByRole('alert').filter({ hasText: 'Something went wrong' })).toBeVisible()
  })
})
