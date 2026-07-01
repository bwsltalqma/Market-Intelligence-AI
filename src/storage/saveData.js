import fs from "fs";
import path from "path";
import { config } from "../config/config.js";

export function saveData(sourceName, data) {
  try {
    const folder = path.resolve(config.storage.databasePath, sourceName);

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    const file = path.join(folder, "data.json");

    let currentData = [];

    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, "utf8");
      currentData = content ? JSON.parse(content) : [];
    }

    currentData.push(...data);

    fs.writeFileSync(file, JSON.stringify(currentData, null, 2));

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
