// spec: specs/greenKart.test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Cart & Checkout Validations', () => {
  test('Apply valid promo code during checkout', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
    await page.locator('text=ADD TO CART').first().click();
    await page.locator('a.cart-icon').click();
    await page.locator('text=PROCEED TO CHECKOUT').click();

    const promoInput = page.locator('input.promoCode');
    await expect(promoInput).toBeVisible();
    await promoInput.fill('rahulshettyacademy');
    await page.locator('button.promoBtn').click();

    const promoInfo = page.locator('span.promoInfo');
    await expect(promoInfo).toHaveText(/Code applied|Code applied ..!/);

    // Verify discounted total is shown
    const discounted = page.locator('span.discountAmt');
    await expect(discounted).toBeVisible();
  });
});