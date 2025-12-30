import { expect, test } from '@playwright/test';
import { loginAs, cashierCredentials } from './helpers/auth';

test('invoice page loads for cashier', async ({ page }) => {
  await loginAs(page, cashierCredentials, '/cashier/dashboard');

  await page.goto('/invoice');
  await expect(page.getByRole('heading', { name: /^invoice mangagement$/i })).toBeVisible({
    timeout: 30_000
  });
  await expect(page.getByRole('button', { name: /search/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /clear/i })).toBeVisible();
});
