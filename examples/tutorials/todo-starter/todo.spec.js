import { test, expect } from 'playwright/test';

test('Vue app renders successfully', async ({ page }) => {
  await page.goto(' http://localhost:5173/');

  const appElement = await page.$('#app');
  expect(appElement).toBeTruthy();

  const title = await page.textContent('h2');
  expect(title).toContain('Todo List');
});
