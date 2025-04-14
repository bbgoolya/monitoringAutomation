import { Page, Locator } from "@playwright/test";

export class AuthLocators {
  // --- Properties ---

  // Readonly properties initialized in the constructor
  readonly page: Page;
  readonly inputFieldEmail: string;
  readonly inputFieldPassword: string;
  readonly buttonLogin: string;
  // Renamed from 'continue' because 'continue' is a reserved keyword
  readonly continueSelector: string;
  readonly error: string; // CSS selector
  readonly errorMessageContainer: string; // XPath selector
  readonly errorButton: string; // XPath selector

  // --- Optional but Recommended: Define Locators directly ---
  readonly emailInputLocator: Locator;
  readonly passwordInputLocator: Locator;
  readonly loginButtonLocator: Locator;
  readonly continueButtonLocator: Locator;
  readonly errorLocator: Locator;
  readonly errorMessageContainerLocator: Locator;
  readonly errorButtonLocator: Locator;

  // --- Constructor ---
  constructor(page: Page) {
    this.page = page;

    // Assign selector strings
    this.inputFieldEmail = "page.getByRole('textbox', { name: 'Name' })";
    this.inputFieldPassword = "page.getByRole('textbox', { name: 'Password' })";
    this.buttonLogin = "page.getByRole('button', { name: 'Sign In' })";
    this.continueSelector = '//*[@value="continue"]';
    this.error = '[data-test="error"]';
    this.errorMessageContainer = '//*[@class="error-message-container"]';
    this.errorButton = '//*[@class="error-button"]';

    // Initialize Locator properties
    this.emailInputLocator = this.page.locator(this.inputFieldEmail);
    this.passwordInputLocator = this.page.locator(this.inputFieldPassword);
    this.loginButtonLocator = this.page.locator(this.buttonLogin);
    this.continueButtonLocator = this.page.locator(this.continueSelector);
    this.errorLocator = this.page.locator(this.error);
    this.errorMessageContainerLocator = this.page.locator(this.errorMessageContainer);
    this.errorButtonLocator = this.page.locator(this.errorButton);
  }

  // --- Example Methods (using Locators) ---

  async fillEmail(email: string): Promise<void> {
    await this.emailInputLocator.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInputLocator.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.loginButtonLocator.click();
  }

  async clickContinue(): Promise<void> {
    await this.continueButtonLocator.click();
  }

  async getErrorMessage(): Promise<string | null> {
     // Assuming the error message is the text content of the error container
     return this.errorMessageContainerLocator.textContent();
  }
}