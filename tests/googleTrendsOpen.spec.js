import { test, expect } from '@playwright/test';
import { launchBrowser } from '../src/utils/browser.js';

test('Open Google Trends', async () => {

    const { browser, page } = await launchBrowser();

    await page.goto('https://trends.google.com/trending', {
        waitUntil: 'networkidle'
    });

    const title = await page.title();

    console.log(title);

    expect(title.length).toBeGreaterThan(0);

    await browser.close();

});
