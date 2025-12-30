import { Page } from '@playwright/test';

export type Credentials = {
  username: string;
  password: string;
};

export const adminCredentials: Credentials = {
  username: process.env.E2E_ADMIN_USER || 'admin',
  password: process.env.E2E_ADMIN_PASS || 'Password123!'
};

export const managerCredentials: Credentials = {
  username: process.env.E2E_MANAGER_USER || 'john.manager',
  password: process.env.E2E_MANAGER_PASS || 'Password123!'
};

export const cashierCredentials: Credentials = {
  username: process.env.E2E_CASHIER_USER || 'sarah.cashier',
  password: process.env.E2E_CASHIER_PASS || 'Password123!'
};

export const warehouseCredentials: Credentials = {
  username: process.env.E2E_WAREHOUSE_USER || 'mike.warehouse',
  password: process.env.E2E_WAREHOUSE_PASS || 'Password123!'
};

export async function loginAs(
  page: Page,
  creds: Credentials = adminCredentials,
  expectedPath: string = '/admin/dashboard'
) {
  await page.goto('/login');

  await page.getByLabel('Username').fill(creds.username);
  await page.getByLabel('Password').fill(creds.password);

  await Promise.all([
    page.waitForURL(`**${expectedPath}`, { timeout: 30_000 }),
    page.getByRole('button', { name: /login/i }).click()
  ]);
}
