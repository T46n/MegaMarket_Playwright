import { test, expect } from '@playwright/test';
import { artifactPath } from './helpers/artifacts';

test.describe('Login page', () => {
  test('renders the login form', async ({ page }) => {
    await page.goto('/login');

    await expect(page.getByLabel('Username')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: /login/i })).toBeEnabled();

    await page.screenshot({ path: artifactPath('login-page.png'), fullPage: true });
  });

  test('shows an error for invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel('Username').fill('wrong.user');
    await page.getByLabel('Password').fill('bad-password');
    await page.getByRole('button', { name: /login/i }).click();

    const alert = page.locator('.alert.alert-danger');
    await expect(alert).toBeVisible({ timeout: 20_000 });
    await expect(alert).toContainText(/invalid username or password/i);
  });
});
