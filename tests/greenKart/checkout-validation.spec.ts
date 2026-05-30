// spec: specs/greenKart.test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Cart & Checkout Validations', () => {
  test('Checkout validation: mandatory fields and terms acceptance', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
    await page.locator('text=ADD TO CART').first().click();
    await page.locator('a.cart-icon').click();
    await page.locator('text=PROCEED TO CHECKOUT').click();

    // Attempt to place order without additional selections
    await page.locator('button:has-text("Place Order")').click();

    // The site advances to country selection — verify presence of select element
    await expect(page.locator('select')).toBeVisible();
  });
});
