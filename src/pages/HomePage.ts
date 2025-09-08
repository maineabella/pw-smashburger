import { Page, Locator } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class HomePage extends BasePage {
  public readonly orderNowBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.url = '/';
    this.orderNowBtn = page.getByRole('main').getByRole('link', { name: 'Order Now' })
  }

  async clickOrderNow() {
    await this.orderNowBtn.click();
  }

}