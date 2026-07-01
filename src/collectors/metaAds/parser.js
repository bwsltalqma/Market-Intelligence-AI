export function parseMetaAds(rawData = []) {
  if (!Array.isArray(rawData)) {
    return [];
  }

  return rawData.map((item) => ({
    keyword: item.keyword || "",
    country: item.country || "",
    category: item.category || "",
    search_volume: 0,
    growth: 0,
    averagePrice: 0,
    profitMargin: 0,
    adDuration: item.adDuration || 0,
    isActive: item.isActive ?? false,
    date: item.date || new Date().toISOString(),
    source: "MetaAds"
  }));
}
