import { expect, test } from "./fixtures/test-fixtures";
import { mockBasketWithFile } from "@/helpers/mockBasket";

test.describe("End-to-End: Mock order under cart", () => {
  test("Mock orders without images and replace with custom", async ({
    page,
    locationsPage,
    menuPage,
    cartPage,
  }) => {
    await locationsPage.goto();
    await locationsPage.startOrder("Pickup", "80246", "Glendale");

    await mockBasketWithFile(page);

    await menuPage.goto(
      "/featured-new-items/double-smoked-brisket-bacon-smash"
    );
    await menuPage.clickStartOrder();
    await menuPage.clickAddToCart();

    await menuPage.goto("/all-the-time-value-menu/americana-dog");
    await menuPage.clickStartOrder();
    await menuPage.clickAddToCart();

    await menuPage.goto("/meal-deals/4-classics-bundle");
    await menuPage.clickStartOrder();
    await menuPage.clickAddToCart();

    await cartPage.goto();
    const customImages = [
      "https://placecats.com/neo_banana/300/200",
      "https://placecats.com/louie/300/200",
      "https://placecats.com/bella/300/200",
    ];

    // Replace <img> srcset for each order
    await page.evaluate((images) => {
      document
        .querySelectorAll("tr.group\\/cart-row img")
        .forEach((img, index) => {
          (img as HTMLImageElement).src = images[index % images.length];
          (img as HTMLImageElement).srcset = ""; // clear srcset to avoid override
        });
    }, customImages);

    const firstImgSrc = await page
      .locator("tr.group\\/cart-row img")
      .first()
      .getAttribute("src");
    expect(firstImgSrc).toContain("placecats.com");
  });
});
