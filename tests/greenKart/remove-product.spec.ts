// spec: specs/greenKart.test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Shopping Flow', () => {
  test.fixme('Remove product from cart and validate empty cart state', async ({ page }) => {
      // This test is marked as FIX ME because this site variant does not expose
      // an explicit remove control in the cart UI. Investigate and re-enable
      // when a stable remove mechanism is available (mini-cart remove button or in-cart delete).
    });
});