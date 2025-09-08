import { Locator, Page } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class MenuPage extends BasePage {
    public readonly addQtyBtn: Locator;
    public readonly subtractQtyBtn: Locator;
    public readonly addToCartBtn: Locator;
    public readonly proceedToCheckoutBtn: Locator;
    public readonly startAnOrderBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.url = '/menu';    
    this.addQtyBtn = page.getByRole('button', { name: 'Increase' });
    this.subtractQtyBtn = page.getByRole('button', { name: 'Decrease' });
    this.addToCartBtn = page.getByRole('button', { name: 'Add to Cart - $' });
    this.proceedToCheckoutBtn = page.getByRole('link', { name: 'Proceed to checkout' });
    this.startAnOrderBtn = page.getByRole('link', { name: 'Start an Order' });
  }
  
  async clickStartOrder() {
    if (await this.startAnOrderBtn.isVisible().catch(() => false)) {
      await this.startAnOrderBtn.click();
    } else {
      console.log('Start Order button not found, skipping...');
    }
  }

  async selectRadio(optionName: string) {
    await this.page.getByRole('radio', { name: optionName }).click();
  }

  async selectCheckbox(optionName: string, exact: boolean = false) {
    await this.page.getByRole('checkbox', { name: optionName, exact }).check();
  }

  async clickAddQty() {
    await this.addQtyBtn.click();
  }

  async clickSubtractQty() {
    await this.subtractQtyBtn.click();
  }

  async clickAddToCart() {
    await this.addToCartBtn.click();
  }

  async clickProceedToCheckout() {
    await this.proceedToCheckoutBtn.click();
  }

}
