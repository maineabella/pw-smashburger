import { Locator, Page } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class CartPage extends BasePage {
    public readonly checkoutBtn: Locator;
    public readonly acceptCookieBtn: Locator;
    public readonly orderSuccessthankYouLabel: Locator;
    public readonly orderNumLabel: Locator;

  constructor(page: Page) {
    super(page);
    this.url = '/cart';    
    this.checkoutBtn = page.getByRole('link', { name: 'Checkout' });
    this.acceptCookieBtn = page.getByRole('button', { name: 'Accept' });
    this.orderSuccessthankYouLabel = page.getByRole('heading', { name: 'Thank You' })
    this.orderNumLabel = page.getByRole('heading', { name: 'Order #' });
  }

  async clickCheckout() {
    await this.checkoutBtn.click();
  }

  async verifyCheckoutSuccess() {
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    const today: Date = new Date();
    const formattedDate: string = today.toLocaleDateString('en-US', options);
    await this.expectVisible(this.orderSuccessthankYouLabel);
    await this.expectVisible(this.orderNumLabel);
    // await this.expectVisible(this.page.getByText(`Order placed ${formattedDate},`));
    // await this.expectVisible(this.page.getByText('For pickup on ${formattedDate},'));
  }

}

