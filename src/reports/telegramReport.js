export function buildTelegramReport(report) {
  const lines = [];

  lines.push("📊 Market Intelligence AI Report");
  lines.push("");
  lines.push(`Confidence Score: ${report.confidence}%`);
  lines.push(`Total Opportunities: ${report.totalOpportunities}`);
  lines.push("");

  report.opportunities.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.keyword}`);
    lines.push(`Score: ${item.score}`);
    lines.push("");
  });

  return lines.join("\n");
}
