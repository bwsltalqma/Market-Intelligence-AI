export function normalizeGoogleTrends(rawData) {
  return rawData.map(item => ({
    keyword: item.keyword,
    country: item.country,
    searches: item.searches,
    collectedAt: item.collectedAt
  }));
}
