import { test, expect } from '@playwright/test'

/**
 * Covers item 5: 375px, no horizontal scroll, header + CTAs reachable.
 */
test.use({ viewport: { width: 375, height: 812 } })

const PAGES = [
  { path: '/', name: 'homepage' },
  { path: '/case-studies/mini-pancake-co', name: 'Mini Pancake Co.' },
  { path: '/case-studies/beyond-skincare', name: 'BEYOND Skincare' },
  { path: '/case-studies/beauty-by-amy', name: 'Beauty by Amy' },
]

for (const { path, name } of PAGES) {
  test(`${name} at 375px: no horizontal scroll, header/CTAs reachable`, async ({ page }) => {
    await page.goto(path)

    const hasHorizontalScroll = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    )
    expect(hasHorizontalScroll, `${path} should not scroll horizontally at 375px`).toBe(false)

    // Wordmark + "Get in touch" pill are always in the sticky header.
    await expect(page.getByText('Mariaelena', { exact: true }).first()).toBeVisible()
    const cta = page.getByRole('link', { name: 'Get in touch' })
    await expect(cta).toBeVisible()
    await expect(cta).toBeInViewport()

    // Floating assistant launcher must be reachable too.
    await expect(page.getByRole('button', { name: 'Ask about my work', exact: true })).toBeVisible()
  })
}
