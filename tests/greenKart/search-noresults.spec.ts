// spec: specs/greenKart.test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Search & Filters', () => {
  test('No-results search behaviour', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');

    const search = page.locator('input[type="search"]');
    await search.fill('qwertyasdf');

    // Expect no visible product cards
    const visible = await page.locator('.product').filter({ has: page.locator(':visible') }).count();
    expect(visible).toBe(0);
  });
});
