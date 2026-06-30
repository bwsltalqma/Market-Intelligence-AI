import { chromium } from 'playwright';
import { saveLog } from '../../storage/dataStorage.js';

export async function collectTrends() {
    const startTime = new Date();
    const sourceName = 'Google Trends';
    let browser;
    let trends = [];
    
    try {
        browser = await chromium.launch({ headless: true });
        const context = await browser.newContext({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        });
        const page = await context.newPage();
        
        await page.goto('https://trends.google.com/trends/trendingsearches/daily?geo=US', {
            waitUntil: 'networkidle',
            timeout: 30000
        });

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
                        "المدينة": "القاهرة ",
                        "الوصف": "Trending query from Google.",
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
