export function buildReport(opportunities = [], confidence = 0) {
  return {
    generatedAt: new Date().toISOString(),
    totalOpportunities: opportunities.length,
    confidence,
    opportunities
  };
}
