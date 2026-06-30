import { chromium } from '@playwright/test';

export async function launchBrowser() {
  const browser = await chromium.launch({
    headless: true
  });

  const page = await browser.newPage();

  return {
    browser,
    page
  };
}
