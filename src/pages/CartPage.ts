import { Locator, Page } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class CartPage extends BasePage {
    public readonly checkoutBtn: Locator;
    public readonly acceptCookieBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.url = '/cart';    
    this.checkoutBtn = page.getByRole('link', { name: 'Checkout' });
    this.acceptCookieBtn = page.getByRole('button', { name: 'Accept' });
  }

  async clickCheckout() {
    await this.checkoutBtn.click();
  }

}
