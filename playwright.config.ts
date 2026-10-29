import { defineConfig, devices } from '@playwright/test'

/**
 * Tests run against a real production build (`next build` + `next
 * start`), not dev - dev mode has previously hidden real production-only
 * bugs on this project. The webServer below only runs `next start`;
 * the build itself is run as a separate step before `playwright test`
 * so a build failure is reported as a build failure, not a flaky
 * server-start timeout.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
  use: {
    baseURL: 'http://localhost:3011',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run start -- -p 3011',
    url: 'http://localhost:3011',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
})
