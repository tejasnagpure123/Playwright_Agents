// spec: specs/greenKart.test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Search & Filters', () => {
  test('Search using full product name', async ({ page }) => {
    // 1. Home page loaded
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');

    // 2. Enter a full known product name (e.g., 'Cucumber') and trigger search
    const search = page.locator('input[type="search"]');
    await expect(search).toBeVisible();
    await search.fill('Cucumber');

    // 3. Verify results show matching item(s) and non-matching items hidden
    const matching = page.locator('.product:has-text("Cucumber")');
    await expect(matching).toHaveCount(1);
    await expect(page.locator('.product')).toHaveCount(2); // filtered grid shows limited items
  });
});