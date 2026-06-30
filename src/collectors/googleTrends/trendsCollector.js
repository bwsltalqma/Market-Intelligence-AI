export async function collectGoogleTrends() {
  return [
    {
      keyword: "Artificial Intelligence",
      country: "US",
      searches: "100K+",
      collectedAt: new Date().toISOString()
    },
    {
      keyword: "Electric Cars",
      country: "US",
      searches: "50K+",
      collectedAt: new Date().toISOString()
    }
  ];
}
