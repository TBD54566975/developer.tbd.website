import { test, expect } from 'playwright/test';

test.describe('Vue app rendering and interactions', () => {
  test('should render the Todo List title', async ({ page }) => {
    await page.goto('http://localhost:5174/');

    const title = await page.textContent('h2');
    expect(title).toContain('Todo List');
  });

  test('should allow adding a Todo', async ({ page }) => {
    await page.goto('http://localhost:5174/');

    await page.waitForSelector('#mydid-container');

    // Fill the textarea for adding todos
    await page.fill('textarea[name="add-todo"]', 'New Todo Item');

    // Wait for the button to be interactable
    const submitButton = page.locator('button[type="submit"]');

    // Use JavaScript to click the button if normal click doesn't work
    await page.evaluate(
      (button) => button.click(),
      await submitButton.elementHandle()
    );

    // Wait for the expected Todo item to appear
    await expect(page.locator('div:text("New Todo Item")')).toHaveCount(1);

    // Check if the Todo has been added
    const todoCount = await page.locator('div:text("New Todo Item")').count();
    expect(todoCount).toBeGreaterThan(0);
  });
});
