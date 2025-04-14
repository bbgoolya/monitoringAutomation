import { test, expect } from '@playwright/test';
import { AuthLocators } from '../src/locators/auth-locators'; 

//auth -> feeds
test('Auth to feeds', async ({ page }) => {
  await page.goto('https://idp.dev.cmmndr.tools/realms/stratcom/protocol/openid-connect/auth?client_id=monitoting-platform&redirect_uri=https%3A%2F%2Fmonitoring.dev.cmmndr.tools%2F&response_type=code&scope=openid&state=73053045e3d4479583f13ec24d562906&code_challenge=RPokN2f2FO5Wliu1KHinlyRVJFzDLB10WMXuu5rOi50&code_challenge_method=S256');
  await expect(page.getByRole('textbox', { name: 'Name' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Username or email' }).click();
  await page.getByRole('textbox', { name: 'Username or email' }).fill('ws_admin');

  await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('ws_admin');

  await expect(page.getByRole('checkbox', { name: 'Remember me' })).toBeVisible();
  await page.getByText('Remember me').click();
  await expect(page.getByRole('link', { name: 'I forgot my password' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
  await page.getByRole('checkbox', { name: 'Remember me' }).uncheck();

  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator("id=logo_svg__a").waitFor({ state: 'visible', timeout: 10000 });
  await expect(page.locator("//p[normalize-space()='Filters']")).toBeVisible();
  await expect(page.locator("//p[normalize-space()='Filters']")).toHaveText('Filters');
});