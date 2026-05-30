// spec: specs/greenKart.test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Shopping Flow', () => {
  test('Add multiple different products and update quantities', async ({ page }) => {
    // 1. Start on the home page
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');

    // 2. Add three different products by clicking 'ADD TO CART' on each
    const addBtns = page.locator('text=ADD TO CART');
    await expect(addBtns.nth(0)).toBeVisible();
    await addBtns.nth(0).click();
    await addBtns.nth(1).click();
    await addBtns.nth(2).click();

    // 3. Open cart and increase quantity of one product to 3 using '+' or quantity control
    const cartIcon = page.locator('a.cart-icon');
    await cartIcon.click();
    const proceed = page.locator('text=PROCEED TO CHECKOUT');
    await proceed.click();

    // Inspect cart rows to assert initial quantities present
    const rows = await page.evaluate(() => Array.from(document.querySelectorAll('table tr')).map(r => r.innerText));
    expect(rows.length).toBeGreaterThan(1);

    // Return to home, increase first product quantity to 3 and add it again
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
    const inc = page.locator('a.increment').first();
    await inc.click();
    await inc.click();
    await page.locator('text=ADD TO CART').first().click();

    // 4. Proceed to checkout and verify totals
    await page.locator('a.cart-icon').click();
    await page.locator('text=PROCEED TO CHECKOUT').click();

    // Verify totals: ensure the 'No. of Items' and 'Total After Discount' display
    await expect(page.locator('text=No. of Items')).toBeVisible();
    await expect(page.locator('text=Total After Discount')).toBeVisible();
  });
});