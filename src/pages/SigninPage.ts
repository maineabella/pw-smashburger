import { Page, Locator } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class SigninPage extends BasePage {
  public readonly emailInput: Locator;
  public readonly passwordInput: Locator;
  public readonly signinBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.url = '/sign-in';
    this.emailInput = page.getByRole('textbox', { name: 'Email Address' })
    this.passwordInput = page.getByRole('textbox', { name: 'Password' })
    this.signinBtn = page.getByRole('button', { name: 'Sign In' })
  }

  async loginUser(username: string, password: string) {
    await this.type(this.emailInput, username);
    await this.type(this.passwordInput, password);
    await this.click(this.signinBtn);
  }

}
