import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class CheckoutPage extends BasePage {
    public readonly placeOrderBtn: Locator;
    public readonly signInBtn: Locator;
    public readonly creditCardRadio: Locator;
    public readonly confirmCardBtn: Locator;

    // Test credit card data
    private readonly cardData = {
      cardNumber: '4111 1111 1111 1111',
      expirationDate: '02/39',
      securityCode: '123',
      postalCode: '80246'
    };

  constructor(page: Page) {
    super(page);
    this.url = '/cart/checkout';    
    this.placeOrderBtn = page.getByRole('button', { name: 'Place Order' })
    this.signInBtn = page.locator('#CheckoutForm').getByRole('link', { name: 'Sign In' })
    this.creditCardRadio = page.getByRole('radio', { name: 'Credit Card' })
    this.confirmCardBtn = page.getByRole('button', { name: 'Confirm' })
  }
  
  async selectCreditCardMethod() {
    await this.creditCardRadio.click();
  }

  async clickPlaceOrder() {
    await this.placeOrderBtn.click();
  }

  async clickSignIn() {
    await this.signInBtn.click();
  }

  async validateMenuItems(expectedItems: string[]) {
    for (const item of expectedItems) {
      await expect(this.page.getByText(item, { exact: false })).toBeVisible();
    }
  }

  async clickCardConfirm() {
    await this.confirmCardBtn.click();
  }

  async submitCardDetails() {
    const cardFrame = this.page.locator('#hpc--card-frame');
    await cardFrame.waitFor({ state: 'visible' });
    const frame = cardFrame.contentFrame();

    await frame.getByRole('textbox', { name: 'Card Number' }).fill(this.cardData.cardNumber);
    await frame.getByRole('textbox', { name: 'Expiration Date' }).fill(this.cardData.expirationDate);
    await frame.getByRole('textbox', { name: 'Security Code' }).fill(this.cardData.securityCode);
    await frame.getByRole('textbox', { name: 'Postal Code' }).fill(this.cardData.postalCode);
    await this.clickCardConfirm();
  }

  async completeValidCardPayment() {
    await this.selectCreditCardMethod();
    await this.submitCardDetails();
    await this.clickPlaceOrder();
  }
  
}
