import { launchBrowser, closeBrowser } from "../../utils/browser.js";
import { saveData } from "../../storage/saveData.js";
import { saveLog } from "../../storage/saveLog.js";

export async function collectTikTok() {
  const { browser, page } = await launchBrowser();

  try {
    console.log("TikTok Collector Started");

    // سيتم استبداله لاحقًا بالجمع الحقيقي
    const rawData = [];

    saveData("TikTok", rawData);

    saveLog(
      "TikTok",
      "SUCCESS",
      rawData.length
    );

    return rawData;

  } catch (error) {

    saveLog(
      "TikTok",
      "FAILED",
      0,
      error.message
    );

    throw error;

  } finally {

    await closeBrowser(browser);

  }
}
