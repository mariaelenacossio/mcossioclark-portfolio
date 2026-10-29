import { test, expect } from '@playwright/test'

/**
 * Covers item 7. `motion-safe:` Tailwind variants only apply under
 * `@media (prefers-reduced-motion: no-preference)`, so with reduced
 * motion forced on, these elements should never get an animation/
 * transform applied - they render at their plain default state.
 */
test.use({ reducedMotion: 'reduce' })

test.describe('prefers-reduced-motion', () => {
  test('the scroll cue does not loop', async ({ page }) => {
    await page.goto('/')
    const movingSegment = page.locator('a[aria-label="Scroll to About"] span[aria-hidden="true"] span')
    await expect(movingSegment).toBeVisible()

    const animationName = await movingSegment.evaluate(el => getComputedStyle(el).animationName)
    expect(animationName).toBe('none')
  })

  test('scroll reveals render fully visible without scrolling', async ({ page }) => {
    await page.goto('/')

    // About is below the fold on load - under reduced motion it should
    // already be at full opacity with no offset, not waiting on a
    // scroll-triggered fade-in.
    const aboutContent = page.locator('#about > div').first()
    await expect(aboutContent).toHaveCSS('opacity', '1')
    const transform = await aboutContent.evaluate(el => getComputedStyle(el).transform)
    expect(['none', 'matrix(1, 0, 0, 1, 0, 0)']).toContain(transform)
  })

  test('a case-study section also renders fully visible without scrolling', async ({ page }) => {
    await page.goto('/case-studies/mini-pancake-co')
    const heroBlock = page.locator('main > div > div').first()
    await expect(heroBlock).toHaveCSS('opacity', '1')
  })
})
