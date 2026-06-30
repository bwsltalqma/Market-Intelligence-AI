import { test, expect } from '@playwright/test';
import { normalizeGoogleTrends } from '../src/collectors/googleTrends/googleTrendsParser.js';

test('Google Trends Parser', async () => {

  const rawData = [
    {
      keyword: 'AI',
      country: 'US',
      searches: '100K+',
      collectedAt: '2026-01-01'
    }
  ];

  const result = normalizeGoogleTrends(rawData);

  expect(result.length).toBe(1);
  expect(result[0].keyword).toBe('AI');

});
