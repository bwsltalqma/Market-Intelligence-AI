import { chromium } from "@playwright/test";
import { config } from "../config/config.js";

export async function launchBrowser() {
  const browser = await chromium.launch({
    headless: config.browser.headless
  });

  const page = await browser.newPage();

  page.setDefaultTimeout(config.browser.timeout);

  return {
    browser,
    page
  };
}

export async function closeBrowser(browser) {
  if (browser) {
    await browser.close();
  }
}
