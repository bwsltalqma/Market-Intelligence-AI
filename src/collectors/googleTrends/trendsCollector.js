const { chromium } = require('playwright');
const { saveLog } = require('../../storage/dataStorage');

async function collectTrends() {
    const startTime = new Date();
    const sourceName = 'Google Trends';
    let browser;
    let trends = [];
    
    try {
        // المحاولة الأولى: استخدام المتصفح Playwright
        browser = await chromium.launch({ headless: true });
        const context = await browser.newContext({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        });
        const page = await context.newPage();
        
        await page.goto('https://trends.google.com/trends/trendingsearches/daily?geo=US', {
            waitUntil: 'networkidle',
            timeout: 30000
        });

        // إذا نجح المتصفح في التحميل ولم يتم حظره
        const hasFeed = await page.waitForSelector('.feed-item', { timeout: 8000 }).catch(() => false);
        
        if (hasFeed) {
            trends = await page.evaluate((source) => {
                const items = document.querySelectorAll('.feed-item');
                const dataList = [];
                items.forEach(item => {
                    const title = item.querySelector('.title-link')?.textContent?.trim() || 'N/A';
                    const count = item.querySelector('.search-count-title')?.textContent?.trim() || '0';
                    dataList.push({
                        "اسم المنتج": title,
                        "النيش": "Trending Search",
                        "السعر": "N/A",
                        "المدينة": "US",
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
        }
        
        await browser.close();

        // المحاولة الثانية التلقائية: إذا فشل المتصفح أو أعطى مصفوفة فارغة بسبب الحماية، نسحب من الـ RSS المفتوح فوراً
        if (trends.length === 0) {
            console.log("Playwright restricted or empty. Switching to fallback RSS Feed...");
            const response = await fetch('https://trends.google.com/trending/rss?geo=US');
            const text = await response.text();
            
            // استخراج العناوين برمجياً بدون مكتبات خارجية معقدة
            const matches = text.matchAll(/<title>([^<]+)<\/title>/g);
            let count = 0;
            for (const match of matches) {
                const title = match[1];
                // تخطي عنوان الـ Feed الرئيسي
                if (title.includes("Daily Search Trends") || count >= 15) continue; 
                
                trends.push({
                    "اسم المنتج": title,
                    "النيش": "Trending Search (RSS)",
                    "السعر": "N/A",
                    "المدينة": "US",
                    "الوصف": Trending query detected via Google RSS Feed.,
                    "الكلمات المفتاحية": [title],
                    "عدد التفاعلات": "10K+",
                    "الرابط": "https://trends.google.com/trends/trendingsearches/daily?geo=US",
                    "اسم المصدر": sourceName,
                    "تاريخ الجمع": new Date().toISOString()
                });
                count++;
            }
        }

        const endTime = new Date();
        saveLog(sourceName, startTime, endTime, trends.length);
        return trends;

    } catch (error) {
        if (browser) await browser.close();
        const endTime = new Date();
        saveLog(sourceName, startTime, endTime, 0, error.message);
        return [];
    }
}

module.exports = { collectTrends };
