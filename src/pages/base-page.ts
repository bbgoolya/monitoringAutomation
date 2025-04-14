// base-page.ts
import { type Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  /**
   * Initializes the BasePage with a Playwright Page object.
   * @param page The Playwright Page instance.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates the browser page to the specified URL.
   * Waits until the 'load' event is fired.
   * @param url The URL string to navigate to.
   */
  async goto(url: string): Promise<void> {
    // Ensure the parameter name is conventional (lowercase 'url')
    await this.page.goto(url, { waitUntil: "load" });
    // Using fixed timeouts is generally discouraged. Prefer waiting for specific elements or states.
    // await this.page.waitForTimeout(10000);
  }

  /**
   * Retrieves the full URL of the current page.
   * @returns A promise that resolves to the current URL string.
   */
  async takeURL(): Promise<string> {
    // Directly return the result of page.url()
    return this.page.url();
  }

  /**
   * Retrieves the pathname part of the current page's URL.
   * For example, for "https://example.com/some/path?query=1", it returns "/some/path".
   * @returns A promise that resolves to the pathname string.
   */
  async takeURLPath(): Promise<string> {
    const currentUrl = await this.page.url();
    // Use the standard built-in URL object to parse the URL
    const url = new URL(currentUrl);
    return url.pathname;
  }
}