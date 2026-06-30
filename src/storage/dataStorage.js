import fs from 'fs';
import path from 'path';

const databaseRoot = path.resolve('database');
const logsFolder = path.join(databaseRoot, 'Logs');
const logFile = path.join(logsFolder, 'log.json');

export function saveToDatabase(sourceName, data) {
    try {
        const sourceFolder = path.join(databaseRoot, sourceName);
        const dataFile = path.join(sourceFolder, 'data.json');

        if (!fs.existsSync(sourceFolder)) {
            fs.mkdirSync(sourceFolder, { recursive: true });
        }

        let records = [];

        if (fs.existsSync(dataFile)) {
            const content = fs.readFileSync(dataFile, 'utf8');
            records = content ? JSON.parse(content) : [];
        }

        records.push(...data);

        fs.writeFileSync(
            dataFile,
            JSON.stringify(records, null, 2),
            'utf8'
        );

        return true;

    } catch (error) {
        console.error('Database Error:', error.message);
        return false;
    }
}

export function saveLog(
    sourceName,
    startTime,
    endTime,
    recordsCount,
    errorMessage = null
) {
    try {

        if (!fs.existsSync(logsFolder)) {
            fs.mkdirSync(logsFolder, { recursive: true });
        }

        let logs = [];

        if (fs.existsSync(logFile)) {
            const content = fs.readFileSync(logFile, 'utf8');
            logs = content ? JSON.parse(content) : [];
        }

        logs.push({
            id: logs.length + 1,
            source: sourceName,
            start_time: startTime.toISOString(),
            end_time: endTime.toISOString(),
            duration_seconds: Math.round((endTime - startTime) / 1000),
            records_collected: recordsCount,
            status: errorMessage ? 'Failed' : 'Success',
            error: errorMessage
        });

        fs.writeFileSync(
            logFile,
            JSON.stringify(logs, null, 2),
            'utf8'
        );

        return true;

    } catch (error) {
        console.error('Log Error:', error.message);
        return false;
