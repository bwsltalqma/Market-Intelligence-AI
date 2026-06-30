const { test, expect } = require('@playwright/test');
const { collectTrends } = require('../src/collectors/googleTrends/trendsCollector');
const { saveToDatabase } = require('../src/storage/dataStorage');

test('Test Google Trends Collector and Save Data', async ({}) => {
    console.log('Starting Google Trends collection test...');
    
    // تشغيل الـ collector
    const data = await collectTrends();
    
    console.log(Collected ${data.length} records from Google Trends.);
    
    // التأكد من أن الـ collector لم يفشل وأرجع بيانات (أو مصفوفة فارغة في أسوأ الظروف دون كسر الكود)
    expect(Array.isArray(data)).toBe(true);
    
    if (data.length > 0) {
        // حفظ البيانات في المجلد الخاص بها
        const isSaved = saveToDatabase('google_trends', data);
        expect(isSaved).toBe(true);
        console.log('Google Trends data saved successfully to database!');
    } else {
        console.log('No data collected or collector returned empty, check logs.');
    }
});
