import { test, expect } from 'playwright/test';

test.describe('Next.js app renders - Dinger Chat', () => {
    test('should render the heading', async ({ page }) => {
        await page.goto('http://localhost:8080/');
        const title = await page.textContent('h1');
        expect(title).toContain('Dinger');
    });
});

