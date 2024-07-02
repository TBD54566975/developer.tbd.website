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
    await expect(page.locator('#copy-did-button')).toBeVisible({ timeout: 40000 });
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
});
