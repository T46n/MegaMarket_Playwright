import { expect, test } from '@playwright/test';
import { startDotnet, stopProcess, waitForHttpOk } from './helpers/dotnet';

test('shows a friendly error when API is unreachable', async ({ page }) => {
  test.setTimeout(180_000);
  const uiUrl = 'http://localhost:5024';
  const badApiUrl = 'http://localhost:5999';

  const ui = startDotnet(
    ['run', '--project', 'MegaMarket.BlazorUI', '--no-launch-profile', '--urls', uiUrl],
    {
      env: {
        ApiBaseUrl: badApiUrl,
        E2E_DISABLE_PRERENDER: '1'
      }
    }
  );

  try {
    await waitForHttpOk(`${uiUrl}/login`, 120_000);

    await page.goto(`${uiUrl}/login`);
    await page.getByLabel('Username').fill('admin');
    await page.getByLabel('Password').fill('Password123!');
    await page.getByRole('button', { name: /login/i }).click();

    const alert = page.locator('.alert.alert-danger');
    await expect(alert).toBeVisible({ timeout: 30_000 });
    await expect(alert).toContainText(/refused|no connection|could not be made/i);
  } finally {
    stopProcess(ui);
  }
});
