import { test, expect, type Page } from '@playwright/test'
import { mockAssistant } from './mocks'

/** True if the focused element has a visible focus indicator. */
async function hasVisibleFocusRing(page: Page) {
  return page.evaluate(() => {
    const el = document.activeElement
    if (!el || el === document.body) return false
    const cs = getComputedStyle(el)
    const hasOutline = cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0
    const hasShadowRing = cs.boxShadow !== 'none' && cs.boxShadow !== ''
    return hasOutline || hasShadowRing
  })
}

/**
 * Covers item 6: visible focus throughout, details open via Enter/Space,
 * Escape closes the assistant, plus the skip link (restyled onto dr-
 * tokens as part of the light-system cleanup).
 */
test.describe('Keyboard access', () => {
  test('the skip link appears on the first Tab and Enter moves focus to main content', async ({ page }) => {
    await page.goto('/')
    const skipLink = page.getByRole('link', { name: 'Skip to main content' })

    await page.keyboard.press('Tab')
    await expect(skipLink).toBeFocused()
    await expect(skipLink).toBeVisible()

    await page.keyboard.press('Enter')
    await expect(page.locator('#main-content')).toBeFocused()
  })

  test('tabbing through the homepage always shows a visible focus ring', async ({ page }) => {
    await page.goto('/')
    const stops = 20
    let checked = 0
    for (let i = 0; i < stops; i++) {
      await page.keyboard.press('Tab')
      const tag = await page.evaluate(() => document.activeElement?.tagName)
      if (!tag || tag === 'BODY') continue
      checked++
      expect(await hasVisibleFocusRing(page), `tab stop ${i} (<${tag.toLowerCase()}>) should show a focus ring`).toBe(true)
    }
    expect(checked, 'should have actually reached some focusable elements').toBeGreaterThan(5)
  })

  test('tabbing through a case study always shows a visible focus ring', async ({ page }) => {
    await page.goto('/case-studies/mini-pancake-co')
    const stops = 20
    let checked = 0
    for (let i = 0; i < stops; i++) {
      await page.keyboard.press('Tab')
      const tag = await page.evaluate(() => document.activeElement?.tagName)
      if (!tag || tag === 'BODY') continue
      checked++
      expect(await hasVisibleFocusRing(page), `tab stop ${i} (<${tag.toLowerCase()}>) should show a focus ring`).toBe(true)
    }
    expect(checked).toBeGreaterThan(5)
  })

  test('the breakdown <details> opens with Enter', async ({ page }) => {
    await page.goto('/case-studies/mini-pancake-co')
    const summary = page.getByText('Read the full breakdown')
    await summary.focus()
    await page.keyboard.press('Enter')
    await expect(page.locator('details')).toHaveJSProperty('open', true)
  })

  test('the breakdown <details> opens with Space', async ({ page }) => {
    await page.goto('/case-studies/mini-pancake-co')
    const summary = page.getByText('Read the full breakdown')
    await summary.focus()
    await page.keyboard.press(' ')
    await expect(page.locator('details')).toHaveJSProperty('open', true)
  })

  test('Escape closes the assistant panel', async ({ page }) => {
    await mockAssistant(page)
    await page.goto('/')

    await page.getByRole('button', { name: 'Ask about my work', exact: true }).click()
    const dialog = page.getByRole('dialog', { name: "Ask about Mariaelena's work" })
    await expect(dialog).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
  })
})
