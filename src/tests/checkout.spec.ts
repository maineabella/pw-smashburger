import { users } from '@/fixtures/loginUsers';
import { test } from './fixtures/test-fixtures';

//Set C.Y.O. burger modifiers
const customBurger = {
  options: [
    'Black Bean +$9.19 Add 180',
  ],
  radios: [
    'Classic Add 190 Calories',
    'Aged Swiss Add 80 Calories',
  ],
  checkboxes: [
    'American +$1.00 Add 90',
    'Leaf Lettuce',
  ],
  expectedSummary: [
    'Black Bean•+$9.19',
    'Classic',
    'Aged Swiss',
    'American•+$1.00',
    'Leaf Lettuce',
  ],
};

test.describe('End-to-End: Place an order with specific modifier', () => {
  test('Signedin user can place a customized order successfully', async ({ 
    signinPage, locationsPage, homePage, menuPage, cartPage, checkoutPage 
  }) => {
    // --- Given: guest user initiates order in menu directory ---
    await menuPage.goto('/smashburgers/create-your-own');
    await menuPage.clickStartOrder();

    // --- And: user fills out the order details ---
    await locationsPage.startOrder('Pickup', '80246', 'Glendale');
    await menuPage.clickPickASize();

    // --- And: user selects set custom modifiers ---
    for (const option of customBurger.options) {
      await menuPage.selectDropdown(option);
    }
    for (const radio of customBurger.radios) {
      await menuPage.selectRadio(radio);
    }
    for (const checkbox of customBurger.checkboxes) {
      await menuPage.selectCheckbox(checkbox);
    }
    // --- And: user proceeds order with checkout ---
    await menuPage.clickAddToCart();
    await menuPage.clickProceedToCheckout();

    // --- And: checkout summary should match selections ---
    await checkoutPage.validateMenuItems(customBurger.expectedSummary);

    // --- And: user can place the order by logging in ---
    await cartPage.clickCheckout();
    await checkoutPage.clickSignIn();
    await signinPage.loginUser(users.validUser.email, users.validUser.password);

    // --- Then: order is successfully placed after a valid payment ---    
    await checkoutPage.completeValidCardPayment();
    await cartPage.verifyCheckoutSuccess();
  });

});
