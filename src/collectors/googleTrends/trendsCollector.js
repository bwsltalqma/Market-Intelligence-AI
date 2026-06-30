const { chromium } = require('playwright');
const { saveLog } = require('../../storage/dataStorage');

async function collectTrends() {
    const startTime = new Date();
    const sourceName = 'Google Trends';
    let browser;
    
    try {
        // تشغيل المتصفح في وضع الخفاء خلف الكواليس داخل الـ Workflow
        browser = await chromium.launch({ headless: true });
        const context = await browser.newContext();
        const page = await context.newPage();
        
        // الذهاب لصفحة المؤشرات الشائعة مباشرة لضمان عدم توقف الكود
        await page.goto('https://trends.google.com/trends/trendingsearches/daily?geo=US', {
            waitUntil: 'networkidle',
            timeout: 60000
        });

        // الانتظار حتى تحميل عناصر المؤشرات الشائعة
        await page.waitForSelector('.feed-item', { timeout: 15000 });

        // استخراج البيانات وتحويلها للصيغة الموحدة المطلوبة
        const trends = await page.evaluate((source) => {
            const items = document.querySelectorAll('.feed-item');
            const dataList = [];
            
            items.forEach(item => {
                const title = item.querySelector('.title-link')?.textContent?.trim() || 'N/A';
                const count = item.querySelector('.search-count-title')?.textContent?.trim() || '0';
                
                dataList.push({
                    "اسم المنتج": title,
                    "النيش": "Trending Search",
                    "السعر": "N/A",
                    "المدينة": "US", // النطاق العام الافتراضي
                    "الوصف": Trending query with approx ${count} searches today.,
                    "الكلمات المفتاحية": [title],
                    "عدد التفاعلات": count,
                    "الرابط": "https://trends.google.com/trends/trendingsearches/daily?geo=US",
                    "اسم المصدر": source,
                    "تاريخ الجمع": new Date().toISOString()
                });
            });
            
            return dataList;
        }, sourceName);

        await browser.close();
        const endTime = new Date();
        
        // تسجيل لوج النجاح
        saveLog(sourceName, startTime, endTime, trends.length);
        return trends;

    } catch (error) {
        if (browser) await browser.close();
        const endTime = new Date();
        // تسجيل لوج الفشل دون تعطيل البرنامج الرئيسي
        saveLog(sourceName, startTime, endTime, 0, error.message);
        return [];
    }
}

module.exports = { collectTrends };
