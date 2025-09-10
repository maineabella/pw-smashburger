import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  protected page: Page;
  protected url: string = '';
  public readonly acceptCookieBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptCookieBtn = page.getByRole('button', { name: 'Accept' });
  }

  async goto(path?: string) {
    let targetUrl = this.url;

    if (path) {
      // Ensure no double slashes
      targetUrl = `${this.url.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
    }
    await this.page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
    await expect(this.page).toHaveURL(targetUrl);
  }

  
  async click(locator: Locator) {
    await locator.click();
  }
  
  async scrollToElement(locator: Locator) {
    await locator.scrollIntoViewIfNeeded();
  }

  async clickAcceptCookieIfTrue() {
    if (!this.acceptCookieBtn) {
      console.log('No cookie button defined for this page.');
      return;
    }

    try {
      if (await this.acceptCookieBtn.isVisible()) {
        await this.acceptCookieBtn.click({ force: true });
        console.log('Cookie banner dismissed.');
      }
    } catch {
      console.log('No cookie banner found, skipping...');
    }
  }

  async type(locator: Locator, text: string) {
    await locator.fill(text);
  }

  async getText(locator: Locator): Promise<string> {
    return (await locator.textContent()) || '';
  }

  async expectUrl(url: string | RegExp) {
    await expect(this.page).toHaveURL(url);
  }

  async expectVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  async expectText(locator: Locator, text: string) {
    await expect(locator).toHaveText(text);
  }

}
