import { test as base } from '@playwright/test';
import { SigninPage } from '../../pages/SigninPage';
import { HomePage } from '../../pages/HomePage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { Header } from '../../pages/base/Header';
import { LocationsPage } from '../../pages/LocationsPage';
import { MenuPage } from '../../pages/MenuPage';
import { CartPage } from '@pages/CartPage';

type TestFixtures = {
  signinPage: SigninPage;
  homePage: HomePage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  header: Header;
  locationsPage: LocationsPage;
  menuPage: MenuPage;
};

export const test = base.extend<TestFixtures>({
  signinPage: async ({ page }, use) => {
    const loginPage = new SigninPage(page);
    await use(loginPage);
  },
  
  homePage: async ({ page }, use) => {
    const homepage = new HomePage(page);
    await use(homepage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },

  header: async ({ page }, use) => {
    const header = new Header(page);
    await use(header);
  },

  locationsPage: async ({ page }, use) => {
    const locationsPage = new LocationsPage(page);
    await use(locationsPage);
  },  

  menuPage: async ({ page }, use) => {
    const menuPage = new MenuPage(page);
    await use(menuPage);
  },    
});

export { expect } from '@playwright/test';
