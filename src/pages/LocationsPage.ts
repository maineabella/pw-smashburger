import { Locator, Page } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class LocationsPage extends BasePage {
  public readonly orderType: Locator;
  public readonly zipCode: Locator;
  public readonly searchBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.url = '/locations';
    this.orderType = page.getByRole('button', { name: 'Order Type' });
    this.zipCode = page.getByRole('combobox', { name: 'Search' });
    this.searchBtn = page.locator('button').filter({ hasText: 'Search' });
  }

  async selectOrderType(type: 'Pickup' | 'Delivery') {
    await this.orderType.click();
    await this.page.getByRole('option', { name: type }).click();
  }

  async fillSearchLocation(zip: string) {
    await this.zipCode.fill(zip);
    const firstOption = this.page.getByRole('option').first();  // pick *1st* dropdown option 
    await firstOption.click();
  }

  async clickSearch() {  
    await this.searchBtn.click();
  }

  async clickStartOrder(locationName: string) {
    await this.page.getByRole('button', { name: new RegExp(`Start Order at the ${locationName},`) }).click();
  }

  async startOrder(orderType: 'Pickup' | 'Delivery', zip: string, locationName: string) {
    await this.selectOrderType(orderType);
    await this.fillSearchLocation(zip);
    await this.clickSearch();
    await this.clickStartOrder(locationName);
  }
}
