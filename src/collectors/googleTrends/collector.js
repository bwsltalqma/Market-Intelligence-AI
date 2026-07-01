import { launchBrowser, closeBrowser } from "../../utils/browser.js";

export async function collectGoogleTrends() {
  const { browser, page } = await launchBrowser();

  try {
    await page.goto("https://trends.google.com/trends/", {
      waitUntil: "networkidle"
    });

    console.log("Google Trends loaded successfully.");

    return [];
  } catch (error) {
    console.error("Google Trends Collector Error:", error);
    throw error;
  } finally {
    await closeBrowser(browser);
  }
}
