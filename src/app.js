import { collectGoogleTrends } from "./collectors/googleTrends/collector.js";

export async function startApp() {
  console.log("Market Intelligence AI Started");

  await collectGoogleTrends();

  console.log("Market Intelligence AI Finished");
}
