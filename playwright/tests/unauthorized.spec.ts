import { expect, test } from '@playwright/test';
import { cashierCredentials, loginAs } from './helpers/auth';

test('protected route direct load redirects to login (no server session)', async ({ page }) => {
  await loginAs(page, cashierCredentials, '/cashier/dashboard');

  await page.goto('/admin/dashboard');
  await expect(page).toHaveURL(/\/login/i);
});
