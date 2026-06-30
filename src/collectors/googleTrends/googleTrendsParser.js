import { test, expect } from '@playwright/test';
import { collectGoogleTrends } from '../src/collectors/googleTrends/trendsCollector.js';

test('Google Trends Collector', async () => {

    const result = await collectGoogleTrends();

    expect(result.success).toBe(true);

    expect(result.title.length).toBeGreaterThan(0);

    expect(result.heading.length).toBeGreaterThan(0);

});
