import { defineConfig, devices } from '@playwright/test';

const baseURL =
  process.env.E2E_BASE_URL ||
  process.env.PLAYWRIGHT_BASE_URL ||
  'http://localhost:5023';

const apiURL =
  process.env.E2E_API_URL ||
  process.env.PLAYWRIGHT_API_URL ||
  'http://localhost:5036';

export default defineConfig({
  testDir: './playwright/tests',
  timeout: 30_000,
  expect: {
    timeout: 5_000
  },
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  webServer: process.env.E2E_SKIP_WEBSERVER
    ? []
    : [
        {
          command: 'dotnet run --project MegaMarket.API --launch-profile http',
          url: `${apiURL}/swagger/index.html`,
          reuseExistingServer: true,
          timeout: 120_000
        },
        {
          command: 'dotnet run --project MegaMarket.BlazorUI --launch-profile http',
          url: `${baseURL}/login`,
          reuseExistingServer: true,
          timeout: 120_000,
          env: {
            ApiBaseUrl: apiURL,
            E2E_DISABLE_PRERENDER: '1'
          }
        }
      ],
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    ignoreHTTPSErrors: true
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    }
  ]
});
