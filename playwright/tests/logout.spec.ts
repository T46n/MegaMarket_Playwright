import { expect, test } from '@playwright/test';
import { loginAs } from './helpers/auth';

test('logout clears session and returns to login', async ({ page }) => {
  await loginAs(page);

  await page.getByRole('link', { name: /logout/i }).click();
  await expect(page).toHaveURL(/\/login$/);

  const token = await page.evaluate(() => localStorage.getItem('authToken'));
  expect(token).toBeNull();
});

