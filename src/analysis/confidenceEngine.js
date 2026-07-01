import { sources } from "../config/sources.js";

export function calculateConfidence(scores = {}) {
  let totalWeight = 0;
  let totalScore = 0;

  for (const [sourceName, config] of Object.entries(sources)) {
    if (!config.enabled) continue;

    const score = scores[sourceName] ?? 0;

    totalScore += score * config.weight;
    totalWeight += config.weight;
  }

  if (totalWeight === 0) {
    return 0;
  }

  return Number((totalScore / totalWeight).toFixed(2));
}
