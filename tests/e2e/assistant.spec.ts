import { test, expect } from '@playwright/test'
import { mockAssistant } from './mocks'

/**
 * Covers item 4. The Supabase edge function is mocked for every test
 * here (mockAssistant) - no real call, no real token spent.
 */
test.describe('Assistant panel', () => {
  test('the violet teaser tile opens the panel', async ({ page }) => {
    await mockAssistant(page)
    await page.goto('/#work')

    await page.getByRole('button', { name: /Start a conversation/ }).click()
    await expect(page.getByRole('dialog', { name: "Ask about Mariaelena's work" })).toBeVisible()
  })

  test('the floating launcher button opens the panel', async ({ page }) => {
    await mockAssistant(page)
    await page.goto('/')

    await page.getByRole('button', { name: 'Ask about my work', exact: true }).click()
    await expect(page.getByRole('dialog', { name: "Ask about Mariaelena's work" })).toBeVisible()
  })

  test('sending a question renders the mocked answer', async ({ page }) => {
    await mockAssistant(page, 'This is a mocked reply, no real network call was made.')
    await page.goto('/')

    await page.getByRole('button', { name: 'Ask about my work', exact: true }).click()
    const dialog = page.getByRole('dialog', { name: "Ask about Mariaelena's work" })
    await expect(dialog).toBeVisible()

    await dialog.getByLabel('Your question').fill('What did she build for Mini Pancake Co.?')
    await dialog.getByRole('button', { name: 'Send', exact: true }).click()

    await expect(dialog.getByText('This is a mocked reply, no real network call was made.')).toBeVisible()
  })
})
