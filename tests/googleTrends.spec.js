import { test, expect } from '@playwright/test';
import { collectGoogleTrends } from '../src/collectors/googleTrends/trendsCollector.js';
import { saveToDatabase, saveLog } from '../src/storage/dataStorage.js';

test('Google Trends Collector', async () => {

  const startTime = new Date();

  const data = await collectGoogleTrends();

  expect(Array.isArray(data)).toBe(true);
  expect(data.length).toBeGreaterThan(0);

  const saved = saveToDatabase('GoogleTrends', data);

  expect(saved).toBe(true);

  const endTime = new Date();

  const logged = saveLog(
    'GoogleTrends',
    'Success',
    data.length
  );

  expect(logged).toBe(true);

});
