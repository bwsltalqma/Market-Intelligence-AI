export function pricingAnalyzer(data = []) {
  return data.map((item) => ({
    ...item,
    averagePrice: item.averagePrice ?? 0,
    profitMargin: item.profitMargin ?? 0
  }));
}
