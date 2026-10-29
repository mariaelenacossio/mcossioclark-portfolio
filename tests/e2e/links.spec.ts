import { test, expect, type Page, type APIRequestContext } from '@playwright/test'

const PAGES = [
  '/',
  '/case-studies/mini-pancake-co',
  '/case-studies/beyond-skincare',
  '/case-studies/beauty-by-amy',
]

/**
 * Every `<a href>` on a page, including the ones inside the closed
 * "Read the full breakdown" <details> - that content is CSS-hidden
 * (display:none via group-open:block), not removed from the DOM, so a
 * plain querySelectorAll sees it without needing to open the details.
 */
async function collectHrefs(page: Page): Promise<string[]> {
  return page.$$eval('a[href]', els => els.map(el => el.getAttribute('href') || ''))
}

/**
 * Classifies and checks one href:
 *  - same-page hash (#id) -> the target element must exist
 *  - internal path (/...) -> resolve against baseURL and expect a non-4xx/5xx response
 *  - mailto: -> must contain an @
 *  - everything else (external http(s)) -> must be a well-formed absolute URL;
 *    not fetched, so the test doesn't depend on a third party being up
 */
async function assertHrefNotBroken(href: string, page: Page, request: APIRequestContext, baseURL: string) {
  if (href.startsWith('#')) {
    const id = href.slice(1)
    if (id) await expect(page.locator(`[id="${id}"]`), `#${id} referenced by ${href} should exist`).toHaveCount(1)
    return
  }
  if (href.startsWith('mailto:')) {
    expect(href, `mailto link ${href} should contain an @`).toMatch(/^mailto:[^@]+@[^@]+/)
    return
  }
  if (href.startsWith('/')) {
    const res = await request.get(new URL(href, baseURL).toString())
    expect(res.status(), `internal link ${href} should not 4xx/5xx`).toBeLessThan(400)
    return
  }
  // External - just confirm it's a real absolute URL, don't fetch it.
  expect(() => new URL(href), `${href} should be a well-formed URL`).not.toThrow()
}

test.describe('No broken links', () => {
  for (const path of PAGES) {
    test(`every link on ${path} resolves`, async ({ page, request, baseURL }) => {
      await page.goto(path)
      const hrefs = await collectHrefs(page)
      expect(hrefs.length, 'page should have at least one link').toBeGreaterThan(0)
      for (const href of hrefs) {
        await assertHrefNotBroken(href, page, request, baseURL!)
      }
    })
  }
})

test.describe('Next-project loop', () => {
  test('Mini Pancake -> BEYOND -> Beauty by Amy -> back to Mini Pancake, all on the dark system', async ({ page }) => {
    const loop = [
      { path: '/case-studies/mini-pancake-co', title: 'Mini Pancake Co.' },
      { path: '/case-studies/beyond-skincare', title: 'BEYOND Skincare' },
      { path: '/case-studies/beauty-by-amy', title: 'Beauty by Amy' },
      { path: '/case-studies/mini-pancake-co', title: 'Mini Pancake Co.' },
    ]

    await page.goto(loop[0].path)
    await expect(page.locator('h1')).toHaveText(loop[0].title)

    for (let i = 1; i < loop.length; i++) {
      // Dark chrome check: the dark header has no "About/Work/Process"
      // Navbar aria-label mismatch risk, so assert on a concrete dark-only
      // marker instead - the dark header's own nav + canvas background.
      await expect(page.locator('header.dr-root')).toHaveCount(1)

      await page.getByRole('link', { name: 'Read case study' }).click()
      await expect(page).toHaveURL(new RegExp(loop[i].path + '$'))
      await expect(page.locator('h1')).toHaveText(loop[i].title)
    }

    // Final landing page is still dark too.
    await expect(page.locator('header.dr-root')).toHaveCount(1)
  })
})
