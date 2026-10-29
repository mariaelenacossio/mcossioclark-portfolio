import { test, expect } from '@playwright/test'

/**
 * Covers the not-found requirement from the light-system cleanup: once
 * the light Navbar/Footer branches were removed, an unknown route or an
 * unresolved case-study slug must still get the real (dark) site
 * chrome and a real not-found message - not a blank page, and not a
 * mismatched light header around Next's default 404 text (which is
 * what rendered before this cleanup).
 */
test.describe('Not found', () => {
  test('an unknown route 404s with dark chrome and a real message', async ({ page }) => {
    const response = await page.goto('/totally-made-up-route')
    expect(response?.status()).toBe(404)

    await expect(page.locator('header.dr-root')).toHaveCount(1)
    await expect(page.locator('footer.dr-root')).toHaveCount(1)
    await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Back to home' })).toBeVisible()
  })

  test('an unresolved case-study slug 404s with dark chrome and a real message', async ({ page }) => {
    const response = await page.goto('/case-studies/nope')
    expect(response?.status()).toBe(404)

    await expect(page.locator('header.dr-root')).toHaveCount(1)
    await expect(page.locator('footer.dr-root')).toHaveCount(1)
    await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Back to home' })).toBeVisible()
  })

  test('"Back to home" leads to the dark homepage', async ({ page }) => {
    await page.goto('/case-studies/nope')
    await page.getByRole('link', { name: 'Back to home' }).click()
    await expect(page).toHaveURL(/\/$/)
    await expect(page.locator('h1')).toContainText('I design things')
  })
})
