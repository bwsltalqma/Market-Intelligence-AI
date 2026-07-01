export function parseTikTok(rawData = []) {
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
    hashtags: item.hashtags || [],
    views: item.views || 0,
    likes: item.likes || 0,
    comments: item.comments || 0,
    shares: item.shares || 0,
    date: item.date || new Date().toISOString(),
    source: "TikTok"
  }));
}
