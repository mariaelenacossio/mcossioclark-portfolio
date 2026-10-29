import type { Page } from '@playwright/test'

/**
 * Intercepts the EmailJS network call so the Contact form's success/error
 * states can be exercised without ever sending a real email. EmailJS's
 * default origin is api.emailjs.com (see node_modules/@emailjs/browser's
 * store.js) - route every request there instead of hitting the network.
 */
export async function mockEmailJS(page: Page, outcome: 'success' | 'error') {
  await page.route('https://api.emailjs.com/**', async route => {
    if (outcome === 'success') {
      await route.fulfill({ status: 200, body: 'OK' })
    } else {
      await route.fulfill({ status: 422, body: 'Mocked failure' })
    }
  })
}

/**
 * Intercepts the Supabase edge function the Assistant calls, so opening
 * the panel and sending a question never makes a real call or spends a
 * real token. Matches on the path (`/functions/v1/assistant`) rather
 * than a fixed origin, since the origin comes from an env var.
 */
export async function mockAssistant(page: Page, answer = 'Mocked assistant answer.') {
  await page.route('**/functions/v1/assistant', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ answer }),
    })
  })
}
