// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 50 * 1000,
  expect: {
  timeout: 50 * 1000,
  },
  reporter : 'html',
  use: {
  browserName : 'chromium',
  headless : false,
  screenshot:'on',
  trace: 'retain-on-failure' // off, on, retain-on-failure
  },
  projects : [  // projects is a playwright configuration property which is used to run the tests in different browsers and devices. we can run the tests in different browsers and devices by using projects property.
      {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] // here ... is JS spread operator which is used to copy the properties of an object into another object. here we are copying the properties of devices['Desktop Chrome'] into use property.
       },
      },
      {
        name: 'firefox',
        use: { //here use is a playwright configuration property which is used to set the browser and device options. we can set the browser and device options by using use property.
          trace: 'on',
          viewport: { width: 1280, height: 720 },
          ignoreHTTPSErrors: true, // this one for handling https error in firefox browser SSL certificaton errors, this is playwright browser context option, we can use this option in playwright.config.js file or in test file. if we use this option in playwright.config.js file then it will be applied to all the tests and if we use this option in test file then it will be applied to that specific test only.
          permissions: ['geolocation'], // this one for handling geolocation permission in firefox browser
        }
      }
  ]
});

// In playwright we can create multiple playwright.config.js files for different environments like dev, staging, prod etc.
//  and we can use them in the command line by using --config option. ex command : npx playwright test --config=playwright.config.staging.js