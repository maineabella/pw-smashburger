import { Page, Locator } from '@playwright/test';

export class Header {
  private readonly page: Page;
  public readonly mainNavigation: Locator;
  public readonly logo: Locator;
  public readonly signinButton: Locator;
  public readonly cartButton: Locator;

  public readonly urls = {
    Menu: '/menu',
    Catering: '/catering',
    SmashRewards: '/smash-rewards',
    Deals: '/deals',
    Locations: '/locations',
  };

    private readonly menuNames: Record<keyof Header['urls'], string> = {
    Menu: 'Menu',
    Catering: 'Catering',
    SmashRewards: 'Smash Rewards',
    Deals: 'Deals',
    Locations: 'Locations',
  };

  constructor(page: Page) {
    this.page = page;
    this.mainNavigation = page.getByLabel('Main Navigation');
    this.logo = page.locator('a svg use[href*="#horizontal"]');
    this.signinButton = page.getByRole('link', { name: 'Sign In' }) //page.locator('text=Sign In');
    this.cartButton = page.locator('a svg use[href*="#cart"]');
  }

  async clickLogo() {
    await this.logo.click();
  }

  async clickSignin() {
    await this.signinButton.click();
  }

  async navigateToMenu(menuItem: keyof Header['urls']) {
    const link = this.mainNavigation.getByRole('link', { name: this.menuNames[menuItem] });
    await link.click();
  }

  async clickCart() {
    await this.cartButton.click();
  }
}
