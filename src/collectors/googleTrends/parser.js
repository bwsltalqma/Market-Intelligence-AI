export function parseGoogleTrends(rawData = []) {
  if (!Array.isArray(rawData)) {
    return [];
  }

  return rawData.map((item) => ({
    keyword: item.keyword || "",
    country: item.country || "",
    category: item.category || "",
    search_volume: item.search_volume || 0,
    growth: item.growth || 0,
    date: item.date || new Date().toISOString(),
    source: "GoogleTrends"
  }));
}
