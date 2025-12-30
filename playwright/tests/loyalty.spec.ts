import { expect, test } from '@playwright/test';
import { loginAs } from './helpers/auth';

test('loyalty dashboard loads', async ({ page }) => {
  await loginAs(page);

  await page.goto('/loyalty');
  await expect(page.getByRole('heading', { name: /loyalty dashboard/i })).toBeVisible({
    timeout: 30_000
  });
});

