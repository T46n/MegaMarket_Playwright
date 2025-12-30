import { expect, test } from '@playwright/test';
import { loginAs } from './helpers/auth';
import { artifactPath } from './helpers/artifacts';

test('products page loads and exposes filters', async ({ page }) => {
  await loginAs(page);

  await page.goto('/products');

  await expect(page.getByRole('heading', { name: /product management/i })).toBeVisible({
    timeout: 30_000
  });

  await expect(page.getByPlaceholder(/search by name, barcode, category/i)).toBeVisible();
  await expect(page.getByRole('button', { name: /add product/i })).toBeVisible();

  await page.screenshot({ path: artifactPath('products-page.png'), fullPage: true });
});
