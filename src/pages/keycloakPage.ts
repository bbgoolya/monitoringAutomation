import type { Page } from 'playwright/test';

const { KeycloakLocators } = require('../locators/keycloak-locators');

export class KeycloakPage {
  private readonly page: Page;
  private readonly locators: typeof KeycloakLocators;
  // readonly auth : typeof KeycloakLocators;

  constructor(page: Page) {
    this.page = page;
    this.locators = new KeycloakLocators(this.page);
  }

  async login(username: string | undefined, password: string | undefined) {
    // const auth = new KeycloakLocators(this.page);
    await this.page.fill(this.locators.inputUsername, username ?? '');
    await this.page.getByRole('textbox', { name: 'password' }).fill(password ?? '');
    await this.page.getByRole('button', { name: 'Sign In' }).click();
  }

  async loginFormVisible() {
    try {
      await this.page.getByRole('textbox', { name: 'username' }).waitFor({ state: 'visible' });
      await this.page.getByRole('textbox', { name: 'password' }).waitFor({ state: 'visible' });
      await this.page.getByRole('button', { name: 'Sign In' }).waitFor({ state: 'visible' });
      return true;
    } catch {
      return false;
    }
  }
}