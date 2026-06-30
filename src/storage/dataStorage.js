const fs = require('fs');
const path = require('path');

// دالة لحفظ البيانات بصيغة JSON
function saveToDatabase(sourceName, data) {
    try {
        const dirPath = path.join(__dirname, '../../database');
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        const filePath = path.join(dirPath, ${sourceName}_data.json);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
        return true;
    } catch (error) {
        saveLog(sourceName, new Date(), new Date(), 0, error.message);
        return false;
    }
}

// دالة تسجيل الـ Logs
function saveLog(sourceName, startTime, endTime, recordCount, errorMessage = '') {
    try {
        const dirPath = path.join(__dirname, '../../database');
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        const filePath = path.join(dirPath, 'execution_logs.json');
        
        let logs = [];
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            logs = JSON.parse(fileContent || '[]');
        }

        const newLog = {
            sourceName,
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            recordCount,
            status: errorMessage ? 'Failed' : 'Success',
            errorMessage
        };

        logs.push(newLog);
        fs.writeFileSync(filePath, JSON.stringify(logs, null, 2), 'utf-8');
    } catch (error) {
        console.error('Failed to write log:', error.message);
    }
}

module.exports = { saveToDatabase, saveLog }
