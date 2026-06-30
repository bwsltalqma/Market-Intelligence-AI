import fs from "fs";
import path from "path";

export function saveToDatabase(sourceName, data) {
  try {
    const folder = path.resolve("database", sourceName);

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

export function saveLog(sourceName, status, records, error = "") {
  try {
    const folder = path.resolve("database", "Logs");

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    const file = path.join(folder, "log.json");

    let logs = [];

    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, "utf8");
      logs = content ? JSON.parse(content) : [];
    }

    logs.push({
      source: sourceName,
      status,
      records,
      error,
      time: new Date().toISOString()
    });

    fs.writeFileSync(file, JSON.stringify(logs, null, 2));

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
