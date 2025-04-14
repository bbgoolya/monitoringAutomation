import { defineConfig, type PlaywrightTestConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  /**
   * Maximum time the entire test suite can run. Defaults to 0 (no limit).
   * Set to 15 minutes (900000 ms). Consider making this configurable via env var.
   */
  globalTimeout: process.env.GLOBAL_TIMEOUT ? parseInt(process.env.GLOBAL_TIMEOUT, 10) : 15 * 60 * 1000, // 15 minutes

  /**
   * Maximum time one test can run for. Defaults to 30 seconds.
   * Set to 60 seconds (60000 ms).
   */
  timeout: process.env.TEST_TIMEOUT ? parseInt(process.env.TEST_TIMEOUT, 10) : 60 * 1000, // 60 seconds

  /**
   * Directory containing the test files.
   */
  testDir: './src/tests',

  /**
   * Glob patterns or regular expressions matching test files.
   * Updated for TypeScript files (.spec.ts).
   */
  testMatch: ['**.spec.ts'],

  /**
   * Whether to run tests in parallel. Recommended to keep true.
   */
  fullyParallel: true,

  /**
   * Fail the build on CI if you accidentally left test.only in the source code.
   */
  forbidOnly: !!process.env.CI,

  /**
   * Number of retries for failed tests.
   * Set to 2 retries on CI, 0 locally.
   */
  retries: process.env.CI ? 2 : 0,

  /**
   * Number of parallel workers.
   * Defaults to half of logical CPU cores.
   * Explicitly set to 2 on CI, let Playwright decide locally.
   */
  workers: process.env.CI ? 2 : undefined,

  /**
   * Reporter to use. See https://playwright.dev/docs/test-reporters
   * Use 'dot' for concise output on CI, 'list' for detailed local output.
   */
  reporter: process.env.CI ? 'dot' : 'list',

  /**
   * Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions.
   */
  use: {
    /**
     * Base URL to use in actions like `await page.goto('/')`.
     * Use environment variable `BASE_URL` if available, otherwise fallback.
     */
    baseURL: process.env.BASE_URL || 'https://monitoring.dev.cmmndr.tools/',

    /**
     * Browser settings.
     */
    browserName: 'chromium', // Keep using chromium as specified
    headless: !!process.env.CI, // Run headless on CI, headed locally
    viewport: { width: 1440, height: 900 }, // Keep specified viewport
    ignoreHTTPSErrors: true, // Keep ignoring HTTPS errors

    /**
     * Launch options for the browser.
     */
    launchOptions: {
      // Allow overriding slowMo via environment variable, otherwise use 200ms
      slowMo: process.env.SLOWMO ? parseInt(process.env.SLOWMO, 10) : 200,
      args: [
        "--no-sandbox",
        "--disable-dev-shm-usage",
        "--autoplay-policy=no-user-gesture-required",
        "--ignore-certificate-errors", // Note: ignoreHTTPSErrors often covers this
      ],
    },

    /**
     * Permissions granted to the browser context.
     */
    permissions: ["clipboard-read", "clipboard-write"],

    /**
     * Options for the browser context. Can also specify permissions and ignoreHTTPSErrors here.
     */
    contextOptions: {
      permissions: ["clipboard-read", "clipboard-write"],
      ignoreHTTPSErrors: true, // Can be redundant, but clear
    },

    /* Collect trace when retrying the failed test. */
    trace: 'on-first-retry',

    /* Capture screenshot after each test failure. */
    screenshot: 'only-on-failure',

    /* Record video only when retrying a test for the first time. */
    video: 'on-first-retry',
  },

  /* Configure projects for major browsers (optional, uncomment if needed) */
  // projects: [
  //   {
  //     name: 'chromium',
  //     use: { ...devices['Desktop Chrome'] },
  //   },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  // ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'test-results/',

  /* Run your local dev server before starting the tests (optional, uncomment if needed) */
  // webServer: {
  //   command: 'npm run dev', // Adjust command as needed
  //   url: 'http://localhost:3000', // Adjust URL/port as needed
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 120 * 1000, // Increase timeout if server takes time to start
  // },
};

// Export the configuration wrapped in defineConfig for type safety and future features.
export default defineConfig(config);