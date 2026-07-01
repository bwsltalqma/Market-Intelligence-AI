import { dailyMonitor } from "./scheduler/dailyMonitor.js";

export async function startApp() {
  console.log("=================================");
  console.log("Market Intelligence AI v2.0");
  console.log("=================================");

  const report = await dailyMonitor();

  console.log(report);

  console.log("System Finished Successfully.");
}
