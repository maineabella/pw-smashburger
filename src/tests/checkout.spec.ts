import { users } from '@/fixtures/loginUsers';
import { test } from './fixtures/test-fixtures';

// Example test data for burger modifiers
const customBurger = {
  radios: [
    'Black Bean $9.19 Add 180',
    'Classic Add 190 Calories',
    'Aged Swiss Add 80 Calories',
  ],
  checkboxes: [
    'American +$1.00 Add 90',
    'Leaf Lettuce',
    'Ketchup Add 15 Calories',
  ],
  expectedSummary: [
    'Black Bean+$9.19',
    'Classic',
    'Aged Swiss',
    'American+$1.00',
    'Leaf Lettuce',
    'Ketchup',
  ],
};

test.describe('End-to-End: Place an order with specific modifier', () => {
  test('Signedin user can place a customized order successfully', async ({ 
    signinPage, locationsPage, homePage, menuPage, cartPage, checkoutPage 
  }) => {
    
    // --- Given: a signed-in user ---
    // await homePage.goto(); //flaky 
    await signinPage.goto();
    await signinPage.loginUser(users.validUser.email, users.validUser.password);

    // --- When: user starts an order ---
    await locationsPage.goto();
    await locationsPage.startOrder('Pickup', '80246', 'Glendale');
    await menuPage.goto('/smashburgers/create-your-own');
    await menuPage.clickStartOrder();

    // --- And: selects custom modifiers ---
    for (const radio of customBurger.radios) {
      await menuPage.selectRadio(radio);
    }
    for (const checkbox of customBurger.checkboxes) {
      await menuPage.selectCheckbox(checkbox);
    }
    await menuPage.clickAddToCart();
    await menuPage.clickProceedToCheckout();

    // --- Then: checkout summary should match selections ---
    await checkoutPage.validateMenuItems(customBurger.expectedSummary);

    // --- And: user can place the order ---
    await cartPage.clickCheckout();
    await checkoutPage.clickPlaceOrder();
  });
});
