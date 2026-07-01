export function demandAnalyzer(data = []) {
  return data.map((item) => ({
    ...item,
    demandScore: Number(item.search_volume || 0) + Number(item.growth || 0)
  }));
}
