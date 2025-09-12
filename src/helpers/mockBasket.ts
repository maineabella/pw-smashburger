import { Page } from "@playwright/test";
import path from "path";
import fs from "fs";

export async function mockBasketWithFile(
  page: Page,
  path = "src/tests/mocks/order.json"
) {
  const mockProducts = JSON.parse(fs.readFileSync(path, "utf-8"));

  await page.route("**/api/basket*", async (route) => {
    const original = await route.fetch();
    const json = await original.json();

    json.Products = mockProducts; //overwrite $.Products with order.json

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(json),
    });
  });
}
