// export const KeycloakLocators = {
//   inputUsername: 'username',
//   inputPassword: 'password',
//   buttonSignIn: 'login'
// };

// keycloakLocators.ts
import { type Page, type Locator } from '@playwright/test';
export class KeycloakLocators {
  // Свойства-селекторы лучше сделать readonly, так как они не должны меняться
  readonly inputUsername: any;
  readonly inputPassword: any;
  readonly buttonSignIn: any;
  // Свойство page тоже readonly
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
    // Инициализируем селекторы
    this.inputUsername = '//*[@id="username"]';
    this.inputPassword = '//*[@id="password"]';
    this.buttonSignIn = '//*[@name="login"]';
  }
  // --- Улучшенный вариант с использованием Playwright Locators ---
  // Если вы хотите использовать преимущества локаторов Playwright (автоожидание и т.д.)
  // лучше инициализировать их здесь:
  // readonly inputUsernameLocator: Locator;
  // readonly inputPasswordLocator: Locator;
  // readonly buttonSignInLocator: Locator;
  // constructor(page: Page) {
  //   this.page = page;
  //   // Инициализация селекторов (если они все еще нужны где-то)
  //   this.inputUsername = ‘//*[@id=“username”]‘;
  //   this.inputPassword = ‘//*[@id=“password”]‘;
  //   this.buttonSignIn = ‘//*[@name=“login”]’;
  //   // Инициализация локаторов
  //   this.inputUsernameLocator = page.locator(this.inputUsername);
  //   this.inputPasswordLocator = page.locator(this.inputPassword);
  //   this.buttonSignInLocator = page.locator(this.buttonSignIn);
  // }
}