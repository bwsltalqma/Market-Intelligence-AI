import fs from "fs";
import path from "path";
import { config } from "../config/config.js";

export function loadData(sourceName) {
  try {
    const file = path.resolve(
      config.storage.databasePath,
      sourceName,
      "data.json"
    );

    if (!fs.existsSync(file)) {
      return [];
    }

    const content = fs.readFileSync(file, "utf8");

    return content ? JSON.parse(content) : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
