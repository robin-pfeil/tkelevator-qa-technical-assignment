// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  name: 'SauceDemo E2E Tests',
  testDir: './tests',
  reporter: 'html',
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});