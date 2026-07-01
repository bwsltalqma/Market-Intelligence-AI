export function competitionAnalyzer(data = []) {
  return data.map((item) => ({
    ...item,
    competitionScore: item.competitionScore ?? 0
  }));
}
