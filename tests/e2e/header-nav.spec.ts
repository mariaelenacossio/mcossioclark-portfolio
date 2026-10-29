import { test, expect } from '@playwright/test'

/**
 * Covers item 1: header links scroll to their sections, and the CTA
 * pill reaches the contact form.
 */
test.describe('Dark header navigation', () => {
  test('About, Work, and Process scroll to their sections', async ({ page }) => {
    await page.goto('/')

    const nav = page.getByRole('navigation', { name: 'Primary' })
    for (const { label, id } of [
      { label: 'About', id: 'about' },
      { label: 'Work', id: 'work' },
      { label: 'Process', id: 'process' },
    ]) {
      await nav.getByRole('link', { name: label, exact: true }).click()
      await expect(page.locator(`#${id}`)).toBeInViewport({ ratio: 0.1 })
    }
  })

  test('"Get in touch" pill scrolls to the contact form', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'Get in touch' }).click()
    await expect(page.locator('#contact')).toBeInViewport({ ratio: 0.1 })
    await expect(page.getByLabel('Name *')).toBeVisible()
  })
})
