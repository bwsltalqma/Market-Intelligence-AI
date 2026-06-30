import fs from 'fs';
import path from 'path';

// تحديد مسار مجلد اللوج الموحد
const logPath = path.resolve('database/Logs/log.json');

export function saveToDatabase(sourceName, data) {
    try {
        // إنشاء المسار الديناميكي بناءً على اسم المصدر (مثال: database/GoogleTrends/data.json)
        const folderPath = path.resolve(database/${sourceName});
        const dbPath = path.join(folderPath, 'data.json');

        // إنشاء المجلد إذا لم يكن موجوداً
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
        
        let currentData = [];
        if (fs.existsSync(dbPath)) {
            const fileContent = fs.readFileSync(dbPath, 'utf8');
            currentData = fileContent ? JSON.parse(fileContent) : [];
        }
        
        // دمج البيانات الجديدة مع البيانات السابقة مباشرة كـ Array صافي
        currentData = [...currentData, ...data];
        
        fs.writeFileSync(dbPath, JSON.stringify(currentData, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error(Error saving to ${sourceName} database:, error.message);
        return false;
    }
}

export function saveLog(sourceName, startTime, endTime, recordsCount, errorMessage = null) {
    try {
        if (!fs.existsSync(path.dirname(logPath))) {
            fs.mkdirSync(path.dirname(logPath), { recursive: true });
        }
        
        let logs = [];
        if (fs.existsSync(logPath)) {
            const fileContent = fs.readFileSync(logPath, 'utf8');
            logs = fileContent ? JSON.parse(fileContent) : [];
        }
        
        const newLog = {
            id: logs.length + 1,
            source: sourceName,
            start_time: startTime.toISOString(),
            end_time: endTime.toISOString(),
            duration_seconds: Math.round((endTime - startTime) / 1000),
            records_collected: recordsCount,
            status: errorMessage ? 'Failed' : 'Success',
            error: errorMessage
        };
        
        logs.push(newLog);
        fs.writeFileSync(logPath, JSON.stringify(logs, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error saving log:', error.message);
        return false;
    }
}
