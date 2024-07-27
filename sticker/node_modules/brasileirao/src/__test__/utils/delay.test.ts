import {delay} from'../../utils'

describe('Delay', () => {
  test('Should return a promise that resolves after the specified time', async () => {
    const startTime = Date.now();
    const ms = 1000;
    await delay(ms);
    const endTime = Date.now();
    expect(endTime - startTime).toBeGreaterThanOrEqual(ms);
  });
});