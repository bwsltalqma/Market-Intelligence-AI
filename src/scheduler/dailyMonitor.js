import { collectGoogleTrends } from "../collectors/googleTrends/collector.js";
import { collectFacebookMarketplace } from "../collectors/facebookMarketplace/collector.js";
import { collectFacebookGroups } from "../collectors/facebookGroups/collector.js";
import { collectMetaAds } from "../collectors/metaAds/collector.js";
import { collectTikTok } from "../collectors/tiktok/collector.js";

import { analyzeData } from "../analysis/analyzeData.js";
import { buildReport } from "../reports/reportBuilder.js";

export async function dailyMonitor() {
  console.log("=================================");
  console.log("Starting Daily Monitor");
  console.log("=================================");

  const googleData = await collectGoogleTrends();
  const marketplaceData = await collectFacebookMarketplace();
  const groupsData = await collectFacebookGroups();
  const metaAdsData = await collectMetaAds();
  const tiktokData = await collectTikTok();

  const analyzedData = analyzeData(
    googleData,
    marketplaceData,
    groupsData,
    metaAdsData,
    tiktokData
  );

  const report = buildReport(analyzedData, 0);

  console.log("Daily Monitor Finished");

  return report;
}
