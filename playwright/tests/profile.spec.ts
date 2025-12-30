import { expect, test } from '@playwright/test';
import { loginAs } from './helpers/auth';

test('profile page loads for authenticated user', async ({ page }) => {
  await loginAs(page);

  await page.getByRole('link', { name: /my profile/i }).click();
  await expect(page).toHaveURL(/\/profile$/);
  await expect(page.getByRole('heading', { name: /my profile/i })).toBeVisible({
    timeout: 30_000
  });

  await expect(page.getByRole('button', { name: /edit profile/i })).toBeVisible({
    timeout: 30_000
  });
});
