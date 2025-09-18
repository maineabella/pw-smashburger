import { expect, test } from "./fixtures/test-fixtures";
import { mockBasketWithFile } from "@/helpers/mockBasket";

test.describe("End-to-End: Mock order under cart", () => {
  test("Mock orders without images and replace with custom", async ({
    page, locationsPage, menuPage, cartPage, homePage
  }) => {

    // // --- Given: user mocks the expected data ---     
    // await mockBasketWithFile(page); //if image is stored/fetched thru API, but not applicable in smashuburger's case

    // --- Given: guest user initiates order in menu directory ---
    await menuPage.goto("/featured-new-items/double-smoked-brisket-bacon-smash");
    await menuPage.clickAcceptCookieIfTrue();
    await menuPage.clickStartOrder();
    await locationsPage.startOrder("Pickup", "80246", "Glendale");
    await menuPage.clickAddToCart();

    await menuPage.goto("/all-the-time-value-menu/americana-dog");
    await menuPage.clickStartOrder();
    await menuPage.clickAddToCart();

    await menuPage.goto("/meal-deals/4-classics-bundle");
    await menuPage.clickStartOrder();
    await menuPage.clickAddToCart();

    // --- And: guest user checks out and navigates to cart ---    
    await cartPage.goto();
    const customImages = [
      "https://placecats.com/neo_banana/300/200",
      "https://placecats.com/louie/300/200",
      "https://placecats.com/bella/300/200",
    ];

    // --- When: product image is mocked with a replacement image ---    
    // Replace <img> srcset for each order
    await page.evaluate((images) => {
      document
        .querySelectorAll("tr.group\\/cart-row img")
        .forEach((img, index) => {
          (img as HTMLImageElement).src = images[index % images.length];
          (img as HTMLImageElement).srcset = ""; // clear srcset to avoid override
        });
    }, customImages);

    // --- Then: the order should contain the mock image specified ---        
    const firstImgSrc = await page
      .locator("//tr[contains(@class,'group/cart-row')]//img")
      .first()
      .getAttribute("src");
    expect(firstImgSrc).toContain("placecats.com");
  });
});
