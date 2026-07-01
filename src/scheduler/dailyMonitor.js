import { collectGoogleTrends } from "../collectors/googleTrends/collector.js";
import { analyzeData } from "../analysis/analyzeData.js";
import { buildReport } from "../reports/reportBuilder.js";

export async function dailyMonitor() {
  console.log("Starting Daily Monitor...");

  const googleData = await collectGoogleTrends();

  const analyzedData = analyzeData(googleData);

  const report = buildReport(analyzedData, 0);

  console.log("Daily Monitor Finished.");

  return report;
}
