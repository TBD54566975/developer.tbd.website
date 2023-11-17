import { test, expect } from 'playwright/test';

test('Vue app renders successfully', async ({ page }) => {
  await page.goto(' http://localhost:5176/');

  const appElement = await page.$('#__nuxt');
  expect(appElement).toBeTruthy();

  const title = await page.textContent('h1');
  expect(title).toContain('Shared Todo');
});
