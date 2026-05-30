// spec: specs/greenKart.test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Shopping Flow', () => {
  test('Add single product to cart and checkout (happy path)', async ({ page }) => {
    // 1. Assumption: Start from a fresh browser with cache cleared and the site at https://rahulshettyacademy.com/seleniumPractise/#/
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');

    // 2. In the search box, type a product name (e.g., 'Tomato' or 'Brocolli')
    const search = page.locator('input[type="search"]');
    await expect(search).toBeVisible();
    await search.fill('Tomato');

    // 3. Click 'ADD TO CART' on the matching product
    const addBtns = page.locator('text=ADD TO CART');
    await expect(addBtns.first()).toBeVisible();
    await addBtns.first().click();

    // 4. Open the cart/mini-cart and click 'PROCEED TO CHECKOUT'
    const cartIcon = page.locator('a.cart-icon');
    await cartIcon.click();
    const proceed = page.locator('text=PROCEED TO CHECKOUT');
    await expect(proceed).toBeVisible();
    await proceed.click();

    // 5. On checkout, complete the order flow (apply promo if available, accept terms, click 'Place Order' / equivalent)
    const placeOrder = page.locator('button:has-text("Place Order")');
    await expect(placeOrder).toBeVisible();
    await placeOrder.click();

    // Verify we reached the country/payment step or confirmation
    await expect(page).toHaveURL(/.*country/);
  });
});