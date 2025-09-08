import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class CheckoutPage extends BasePage {
    public readonly placeOrderBtn: Locator;
    public readonly signInBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.url = '/cart/checkout';    
    this.placeOrderBtn = page.getByRole('button', { name: 'Place Order' })
    this.signInBtn = page.locator('#CheckoutForm').getByRole('link', { name: 'Sign In' })
  }
  
  async clickPlaceOrder() {
    await this.placeOrderBtn.click();
  }

  async clickSignIn() {
    await this.signInBtn.click();
  }

  async validateMenuItems(expectedItems: string[]) {
    for (const item of expectedItems) {
      await expect(this.page.getByRole('listitem', { name: item })).toBeVisible();
    }
  }
  expect(arg0: Locator) {
    throw new Error('Method not implemented.');
  }

}
