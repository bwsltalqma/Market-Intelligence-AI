export function keywordAnalyzer(data = []) {
  return data.map((item) => ({
    ...item,
    keywordScore: item.search_volume || 0
  }));
}
