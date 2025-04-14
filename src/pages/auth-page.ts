// auth-page.ts
import { type Page, type Locator, expect } from '@playwright/test'; // Import expect
import { AuthLocators } from '../locators/auth-locators'; // Assuming auth-locators.ts exists

// Note: ActionsPage import is removed as its methods are replaced by direct locator/expect usage here.

export class AuthPage {
  // --- Properties ---
  readonly page: Page;
  readonly authLocators: AuthLocators;

  // --- Constructor ---
  constructor(page: Page) {
    this.page = page;
    // Initialize helper classes once in the constructor
    this.authLocators = new AuthLocators(page);
  }

  // --- Methods ---

  /**
   * Logs in a user using email and password.
   * @param username - The username or email address.
   * @param password - The password.
   */
  async login(username: string, password: string): Promise<void> {
    // TODO: Replace this hardcoded delay with a specific Playwright wait
    // e.g., await this.authLocators.emailInputLocator.waitFor(); or await this.page.waitForLoadState();
    await this.page.waitForTimeout(1000); // Using Playwright's wait instead of raw Promise

    await this.authLocators.emailInputLocator.fill(username);
    await this.authLocators.continueButtonLocator.click(); // Assumes continueButtonLocator exists in AuthLocators
    await this.authLocators.passwordInputLocator.fill(password);
    await this.authLocators.loginButtonLocator.click();
  }

  /**
   * Asserts that the authentication error message element is visible.
   * Waits for the element to appear if it's not immediately present.
   */
  async errorAuthVisible(): Promise<void> {
    // Use Playwright's expect().toBeVisible() for a robust wait and assertion
    await expect(this.authLocators.errorLocator).toBeVisible();
  }

  /**
   * Retrieves the text content of the authentication error message.
   * @returns The error message text or null if the element doesn't exist or has no text.
   */
  async getErrorText(): Promise<string | null> {
     // Optional: Add a specific wait if text content population is delayed after visibility
     // await this.authLocators.errorLocator.waitFor({ state: 'visible', timeout: 5000 });
    return this.authLocators.errorLocator.textContent(); // Or .innerText()
  }

  /**
   * Clicks the button to close the error message.
   */
  async clickCloseErrorButton(): Promise<void> {
    await this.authLocators.errorButtonLocator.click();
  }

  /**
   * Asserts that the authentication error message element is hidden.
   * Waits for the element to disappear if it's not immediately hidden.
   */
  async errorAuthHidden(): Promise<void> {
    // Use Playwright's expect().toBeHidden() for a robust wait and assertion
    await expect(this.authLocators.errorLocator).toBeHidden();
  }
}