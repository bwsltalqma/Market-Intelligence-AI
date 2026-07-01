import { calculateConfidence } from "./confidenceEngine.js";

export function opportunityAnalyzer(data = []) {
  return data.map((item) => {
    const confidence = calculateConfidence({
      googleTrends: item.demandScore ?? 0,
      facebookMarketplace: item.competitionScore ?? 0,
      facebookGroups: 0,
      metaAds: item.profitMargin ?? 0,
      tiktok: 0
    });

    return {
      ...item,
      opportunityScore: confidence
    };
  });
}
