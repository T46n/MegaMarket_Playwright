import { expect, test } from '@playwright/test';
import {
  cashierCredentials,
  loginAs,
  managerCredentials,
  warehouseCredentials
} from './helpers/auth';

test('manager credentials land on manager dashboard', async ({ page }) => {
  await loginAs(page, managerCredentials, '/manager/dashboard');
  await expect(page.getByRole('heading', { name: /manager dashboard/i })).toBeVisible();
});

test('cashier credentials land on cashier dashboard', async ({ page }) => {
  await loginAs(page, cashierCredentials, '/cashier/dashboard');
  await expect(page.getByRole('heading', { name: /cashier dashboard/i })).toBeVisible();
});

test('warehouse credentials land on warehouse dashboard', async ({ page }) => {
  await loginAs(page, warehouseCredentials, '/warehouse/dashboard');
  await expect(page.getByRole('heading', { name: /warehouse dashboard/i })).toBeVisible();
});

