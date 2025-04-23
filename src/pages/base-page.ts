import type { Page } from 'playwright/test';

export class BasePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(URL: string | undefined): Promise<void> {
    await this.page.goto(URL ?? '', { waitUntil: 'domcontentloaded' });
  }
}