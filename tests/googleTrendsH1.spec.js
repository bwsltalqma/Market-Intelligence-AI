import { test, expect } from '@playwright/test';
import { launchBrowser } from '../src/utils/browser.js';

test('Google Trends H1 Test', async () => {

    const { browser, page } = await launchBrowser();

    await page.goto('https://trends.google.com/trending', {
        waitUntil: 'networkidle'
    });

    const h1 = page.locator('h1').first();

    await expect(h1).toBeVisible();

    const text = await h1.textContent();

    console.log('H1:', text);

    expect(text).not.toBeNull();

    await browser.close();

});
