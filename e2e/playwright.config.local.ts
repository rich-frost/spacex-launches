import type { PlaywrightTestConfig } from '@playwright/test';
import baseConfig from './playwright.config';

const config: PlaywrightTestConfig = {
  ...baseConfig,
  forbidOnly: false,
  retries: 0,
  /* video on when running with browser */
  ...(process.env.SHOW_BROWSER === 'true'
    ? {
        use: {
          headless: false,
          viewport: { width: 1280, height: 720 },
          launchOptions: { slowMo: 1000 },
          video: 'on-first-retry',
        },
      }
    : {}),
};

export default config;
