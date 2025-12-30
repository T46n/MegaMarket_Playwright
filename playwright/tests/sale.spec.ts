import { expect, test } from '@playwright/test';
import { loginAs } from './helpers/auth';

test('sale page renders (POS shell)', async ({ page }) => {
  await loginAs(page);

  await page.goto('/sale');
  await expect(page.getByRole('heading', { name: /point of sale/i })).toBeVisible({
    timeout: 30_000
  });
});

