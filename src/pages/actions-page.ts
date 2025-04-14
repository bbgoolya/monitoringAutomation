// actions-page.ts
import { type Page, type Locator } from '@playwright/test';

// --- Placeholder for hexToRgb ---
// Define or import this function based on your actual implementation
// Option 1: Define a simple type if you only need the structure
type RgbColor = { r: number; g: number; b: number } | string | null;
// Option 2: Define a placeholder function if needed for compilation
function hexToRgb(hex: string): RgbColor {
  console.warn(`hexToRgb function not implemented. Input: ${hex}`);
  // Implement your actual conversion logic here
  // Example basic return:
   const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
   return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : null;
   // Or return an object: { r: parseInt(result[1], 16), ... }
}
// --- End Placeholder ---


export class ActionsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Gets the computed CSS 'color' property of an element. */
  async getElementColor(selector: string): Promise<string> {
    const locator = this.page.locator(selector);
    await locator.waitFor({ state: 'visible', timeout: 30000 }); // Ensure element exists and is visible
    const color = await locator.evaluate((el) => {
      return window.getComputedStyle(el).getPropertyValue("color");
    });
    return color;
  }

  /** Gets a specific CSS variable '--bg-color' and converts it using hexToRgb. */
  async getBackgroundColor(selector: string): Promise<RgbColor> {
    const locator = this.page.locator(selector);
    await locator.waitFor({ state: 'visible', timeout: 30000 });
    const color = await locator.evaluate((el) => {
      // Ensure the property exists before getting it
      return window.getComputedStyle(el).getPropertyValue("--bg-color") || '';
    });
    return hexToRgb(color.trim()); // Trim potential whitespace
  }

  /**
   * Removes data from an input field using keyboard actions (less recommended).
   * @deprecated Consider using clearField or fillField methods with empty string.
   */
  async removeDataFromField_Legacy(selector: string): Promise<void> {
    const locator = this.page.locator(selector);
    await locator.click();
    // Note: Selection might not be reliable across all browsers/inputs
    await locator.press("Shift+ArrowDown"); // May not select all
    await locator.press("ArrowDown");       // May not be needed

    // Getting value and backspacing is inefficient and flaky
    const inputValue = await locator.inputValue();
    for (let i = 0; i < inputValue.length; i++) {
      await locator.press("Backspace");
    }
  }

   /** Recommended: Clears an input field using Playwright's clear method. */
   async clearField(selector: string): Promise<void> {
    await this.page.locator(selector).clear();
  }

  /** Recommended: Fills an input field (can be used with "" to clear). */
  async fillField(selector: string, value: string): Promise<void> {
      await this.page.locator(selector).fill(value);
  }


  /** Checks if an element is disabled. */
  async isDisabled(selector: string): Promise<boolean> {
    return this.page.locator(selector).isDisabled();
  }

  /** Selects all text in an input field using Control+A. */
  async selectAllTextInField(selector: string): Promise<void> {
    const locator = this.page.locator(selector);
    await locator.click(); // Focus the element first
    await locator.press("Control+A");
    // Consider using locator.selectText() as a more direct alternative
    // await locator.selectText();
  }

  /** Gets the inner text of an element. Prefer getElementText2 or getElementTextContent. */
  async getElementText_LegacyEvaluate(selector: string): Promise<string> {
    const locator = this.page.locator(selector);
    await locator.waitFor({ state: "visible", timeout: 30000 });
    // Using evaluate with querySelector can differ from Playwright's selector engine
    const textElement = await locator.evaluate((el) => {
      // Use el directly, no need for querySelector again if locator points to the right element
      return (el as HTMLElement).innerText; // Type assertion
    });
    return textElement;
  }

  /** Gets the inner text of an element using locator.innerText(). */
  async getElementText(selector: string): Promise<string> {
    const locator = this.page.locator(selector);
    await locator.waitFor({ state: "visible", timeout: 30000 });
    return locator.innerText();
  }

   /** Gets the text content of an element using locator.textContent(). Handles null possibility. */
   async getElementTextContent(selector: string): Promise<string | null> {
    const locator = this.page.locator(selector);
    await locator.waitFor({ state: "visible", timeout: 30000 });
    return locator.textContent();
  }

  /** Gets the text content of an element (Corrected from original 'getAttribute'). */
  async getTextContent(selector: string): Promise<string | null> {
    const locator = this.page.locator(selector);
    await locator.waitFor({ state: "visible", timeout: 30000 });
    return locator.textContent();
  }

   /** Gets a specific attribute value of an element. */
   async getAttributeValue(selector: string, attributeName: string): Promise<string | null> {
    const locator = this.page.locator(selector);
    // No need to wait explicitly here if the next action implies it,
    // but waitFor might be safer depending on context.
    // await locator.waitFor({ state: 'visible', timeout: 30000 });
    return locator.getAttribute(attributeName);
  }


  /** Checks if an element is visible. */
  async isVisible(selector: string): Promise<boolean> {
    return this.page.locator(selector).isVisible();
  }

  /** Waits for an element to be detached from the DOM. */
  async waitForElementToBeDetached(selector: string): Promise<void> {
    await this.page.locator(selector).waitFor({ state: "detached", timeout: 30000 });
  }

  /** Uploads a file using a file input element. */
  async uploadFile(inputSelector: string, filePath: string): Promise<void> {
    const locator = this.page.locator(inputSelector);
    await locator.setInputFiles(filePath);
    // TODO: Replace timeout with a wait for a specific condition
    // e.g., wait for an upload confirmation message, button state change, etc.
    await this.page.waitForTimeout(1000);
  }

  /** Scrolls an element into view if needed. */
  async scrollElementIntoView(selector: string): Promise<void> {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  /** Performs a continuous scroll until the bottom of the page is reached. */
  async autoScrollToBottom(): Promise<void> {
    await this.page.evaluate(async () => {
      await new Promise<void>((resolve) => { // Added Promise<void> type
        var totalHeight = 0;
        var distance = 100; // Scroll distance per interval
        var timer = setInterval(() => {
          var scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          // Check if scrolled past the bottom or very close to it
          if (totalHeight >= scrollHeight - window.innerHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100); // Interval time
      });
    });
  }

  /** Scrolls the page down significantly (implementation might need adjustment). */
  async scrollPageDownLarge(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); // Scroll to bottom
    // Optional: Add a small delay if needed for content loading after scroll
    // TODO: Replace timeout with a specific wait condition if possible
    await this.page.waitForTimeout(1000); // Shorter timeout than original
  }

  /** Scrolls the page down by a small amount (implementation might need adjustment). */
  async scrollPageDownSmall(): Promise<void> {
     // Maybe scroll by viewport height instead of arbitrary number?
    await this.page.evaluate(() => window.scrollBy(0, window.innerHeight));
    // TODO: Replace timeout with a specific wait condition if possible
    await this.page.waitForTimeout(1000); // Shorter timeout than original
  }

  /** Checks if an element is hidden (not visible or not in DOM). */
  async isHidden(selector: string): Promise<boolean> {
    return this.page.locator(selector).isHidden();
  }

  /** Waits for an element to become visible. */
  async waitForElementToBeVisible(selector: string): Promise<void> {
    await this.page.locator(selector).waitFor({ state: "visible", timeout: 30000 });
  }
}