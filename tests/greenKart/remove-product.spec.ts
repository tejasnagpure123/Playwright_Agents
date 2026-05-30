// spec: specs/greenKart.test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Shopping Flow', () => {
  test('Remove product from cart and validate empty cart state', async ({ page }) => {
    // Add a product to cart
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
    await page.locator('text=ADD TO CART').first().click();

    // Open cart and go to checkout
    await page.locator('a.cart-icon').click();
    await page.locator('text=PROCEED TO CHECKOUT').click();

    // Attempt to find and click a remove control if present
    const removeByText = page.locator('text=Remove');
    const removeBySelector = page.locator('a.remove, button.remove, .remove-item');

    if (await removeByText.count() > 0) {
      await removeByText.click();
    } else if (await removeBySelector.count() > 0) {
      await removeBySelector.first().click();
    } else {
      // If no remove control is present, fail the test with informative message
      throw new Error('Remove control not present in this application variant');
    }

    // Verify cart is empty
    await expect(page.locator('table.cartTable')).toHaveCount(0);
    await expect(page.locator('text=No. of Items')).toContainText('0');
  });
});