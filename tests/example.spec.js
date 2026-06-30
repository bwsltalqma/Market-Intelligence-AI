import { test, expect } from '@playwright/test';

test('Verify Google Title', async ({ page }) => {
  await page.goto('https://www.google.com');
  await expect(page).toHaveTitle(/Google/);
});
