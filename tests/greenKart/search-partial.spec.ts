// spec: specs/greenKart.test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Search & Filters', () => {
  test('Search using partial text and case-sensitivity check', async ({ page }) => {
    // Start with the home page
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');

    // Enter partial text and verify multiple matches
    const search = page.locator('input[type="search"]');
    await search.fill('to');
    const visibleProducts = page.locator('.product:visible');
    // Playwright does not have toHaveCountGreaterThan; check numeric count instead
    const count = await visibleProducts.count();
    expect(count).toBeGreaterThan(1);

    // Verify case-insensitivity by re-entering 'To'
    await search.fill('To');
    await expect(page.locator('.product:has-text("Tomato")')).toBeVisible();

    // Clear search
    await search.fill('');
    const fullCount = await page.locator('.product').count();
    expect(fullCount).toBeGreaterThan(10);
  });
});
