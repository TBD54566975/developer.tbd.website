import { test, expect } from 'playwright/test';

const fakeDID = 'did:example:123456789abcdefghi';
const dingerUrl = 'http://localhost:8081/';

const mockWeb5 = async (page, fakeDID) => {
    await page.addInitScript((fakeDID) => {
        window.Web5 = {
            connect: async () => ({ did: fakeDID }),
        };
    }, fakeDID);
};

const checkHeading = async (page) => {
    const heading = await page.textContent('header h1');
    expect(heading).toBe('Dinger');
};

const checkCopyDIDButton = async (page) => {
    await expect(page.locator('#copy-did-button')).toBeVisible({ timeout: 20000 });
};

const testCopyDIDButton = async (page) => {
    await page.click('#copy-did-button');
    await page.click('text=Create +');
    await expect(page.locator('input[name="recipientDid"]')).toBeVisible();
    await page.fill('input[name="recipientDid"]', fakeDID);

    const input = await page.$('input[name="recipientDid"]');
    const inputValue = await input.getAttribute('value');
    expect(inputValue).toBe(fakeDID);

    await page.click('text=Confirm');
    await expect(page.locator('input[name="note"]')).toBeVisible();
};

test.describe('Next.js app renders - Dinger Chat', () => {
    test.beforeEach(async ({ page }) => {
        await mockWeb5(page, fakeDID);
    });

    test('Page loads with the correct heading', async ({ page }) => {
        await page.goto(dingerUrl);
        await checkHeading(page);
    });

    test('Web5 loads successfully and Copy DID button appears', async ({ page }) => {
        await page.goto(dingerUrl);
        await checkCopyDIDButton(page);
    });

    test('Copy DID button copies DID and pastes it in new chat input', async ({ page }) => {
        await page.goto(dingerUrl);
        await testCopyDIDButton(page);
    });
});
