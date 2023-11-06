const { devices } = require('playwright/test');

module.exports = {
  use: {
    browserName: 'chromium',
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
  reporter: [['html'], ['dot']],
  testDir: './',
  testMatch: '**/*.spec.js',
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
    {
      name: 'Microsoft Edge',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge',
      },
    },
    {
      name: 'Google Chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
  ],
};
