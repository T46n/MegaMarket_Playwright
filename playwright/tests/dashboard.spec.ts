import { expect, test } from '@playwright/test';
import { loginAs } from './helpers/auth';
import { artifactPath } from './helpers/artifacts';

test.use({ video: 'on' });

test('admin login redirects to the admin dashboard', async ({ page }) => {
  await loginAs(page);

  await expect(page).toHaveURL(/admin\/dashboard/i);
  await expect(page.getByRole('heading', { name: /admin dashboard/i })).toBeVisible({ timeout: 5_000 });

  await expect(page.getByText('Sales & Revenue Analytics')).toBeVisible({ timeout: 5_000 });

  await page.screenshot({ path: artifactPath('admin-dashboard.png'), fullPage: true });
});
