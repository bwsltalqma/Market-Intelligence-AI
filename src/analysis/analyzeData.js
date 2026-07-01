import { mergeSources } from "./mergeSources.js";
import { keywordAnalyzer } from "./keywordAnalyzer.js";
import { demandAnalyzer } from "./demandAnalyzer.js";
import { competitionAnalyzer } from "./competitionAnalyzer.js";
import { pricingAnalyzer } from "./pricingAnalyzer.js";

export function analyzeData(...sources) {
  let data = mergeSources(...sources);

  data = keywordAnalyzer(data);
  data = demandAnalyzer(data);
  data = competitionAnalyzer(data);
  data = pricingAnalyzer(data);

  return data;
}
