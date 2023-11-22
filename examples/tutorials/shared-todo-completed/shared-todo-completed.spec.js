import { test, expect } from 'playwright/test';

test.describe('Vue app rendering and interactions', () => {
  test('should render the Todo List title', async ({ page }) => {
    await page.goto('http://localhost:5175/');

    const title = await page.textContent('h1');
    expect(title).toContain('Shared Todo');
  });

  test('should allow copying DID', async ({ page }) => {
    await page.goto('http://localhost:5175/');

    await page.waitForSelector('#copy-did');

    await expect(page.locator('#copy-did')).toHaveCount(1);

  });
});
