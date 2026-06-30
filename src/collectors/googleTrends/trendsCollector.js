import { launchBrowser } from '../../utils/browser.js';

export async function collectGoogleTrends() {

    const { browser, page } = await launchBrowser();

    try {

        await page.goto(
            'https://trends.google.com/trending',
            {
                waitUntil: 'networkidle'
            }
        );

        const title = await page.title();

        const h1 = await page.locator('h1').first().textContent();

        await browser.close();

        return {
            success: true,
            title,
            heading: h1
        };

    } catch (error) {

        await browser.close();

        return {
            success: false,
            error: error.message
        };

    }

}
