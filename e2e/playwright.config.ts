import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30 * 1000,
  fullyParallel: true,
  outputDir: 'test-results/',
  reporter: [['junit', { outputFile: './test-results/results.xml' }]],
  workers: 2,
  retries: 3,
  use: {
    video: {
      mode: 'on-first-retry',
      size: { width: 640, height: 480 },
    },
    actionTimeout: 0,
    trace: 'on-first-retry',
  },
  projects: [
    // Run the test on the configured devices
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: {
          width: 1280,
          height: 960,
        },
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 7'],
      },
    },
    {
      name: 'iPad',
      use: {
        ...devices['iPad Pro 11'],
        defaultBrowserType: 'chromium',
      },
    },
  ],
};

export default config;
