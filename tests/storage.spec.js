import { test, expect } from '@playwright/test';
import { saveToDatabase, saveLog } from '../src/storage/dataStorage.js';

test('Storage Test', async () => {

  const saved = saveToDatabase('TestSource', [
    {
      id: 1,
      title: 'Test Record'
    }
  ]);

  expect(saved).toBe(true);

  const logged = saveLog(
    'TestSource',
    'Success',
    1,
    ''
  );

  expect(logged).toBe(true);

});
