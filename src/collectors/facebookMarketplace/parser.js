export function parseFacebookMarketplace(rawData = []) {
  if (!Array.isArray(rawData)) {
    return [];
  }

  return rawData.map((item) => ({
    keyword: item.keyword || "",
    country: item.country || "",
    category: item.category || "",
    search_volume: 0,
    growth: 0,
    averagePrice: item.price || 0,
    profitMargin: 0,
    date: item.date || new Date().toISOString(),
    source: "FacebookMarketplace"
  }));
}
