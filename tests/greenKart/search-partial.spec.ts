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
    await expect(visibleProducts).toHaveCountGreaterThan(1);

    // Verify case-insensitivity by re-entering 'To'
    await search.fill('To');
    await expect(page.locator('.product:has-text("Tomato")')).toBeVisible();

    // Clear search
    await search.fill('');
    await expect(page.locator('.product')).toHaveCountGreaterThan(10);
  });
});
