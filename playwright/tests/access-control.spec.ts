import { test, expect } from '@playwright/test';

test('redirects unauthenticated users to login', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/login/i);
});

test('protected route redirects unauthenticated users to login', async ({ page }) => {
  await page.goto('/admin/dashboard');
  await expect(page).toHaveURL(/\/login/i);
});
