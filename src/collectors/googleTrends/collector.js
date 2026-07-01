import { launchBrowser, closeBrowser } from "../../utils/browser.js";
import { parseGoogleTrends } from "./parser.js";
import { saveData } from "../../storage/saveData.js";
import { saveLog } from "../../storage/saveLog.js";

export async function collectGoogleTrends() {
  const { browser, page } = await launchBrowser();

  try {
    await page.goto("https://trends.google.com/trends/", {
      waitUntil: "networkidle"
    });

    console.log("Google Trends loaded successfully.");

    // سيتم استبدال هذا لاحقًا بالبيانات الحقيقية
    const rawData = [];

    const parsedData = parseGoogleTrends(rawData);

    saveData("GoogleTrends", parsedData);

    saveLog(
      "GoogleTrends",
      "SUCCESS",
      parsedData.length
    );

    return parsedData;

  } catch (error) {

    saveLog(
      "GoogleTrends",
      "FAILED",
      0,
      error.message
    );

    throw error;

  } finally {

    await closeBrowser(browser);

  }
}
