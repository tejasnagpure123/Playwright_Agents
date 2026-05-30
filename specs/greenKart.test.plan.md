# GreenKart - veg and fruits kart Test Plan

## Application Overview

End-to-end test plan for GreenKart (veg and fruits kart) covering core shopping flows, search behaviour, cart/checkout, coupon handling, edge cases, and accessibility/responsiveness. Assumes a fresh browser state and default site data (no user login required).

## Test Scenarios

### 1. Shopping Flow

**Seed:** `tests/seed.spec.ts`

#### 1.1. Add single product to cart and checkout (happy path)

**File:** `tests/greenKart/add-single-product.spec.ts`

**Steps:**
  1. Assumption: Start from a fresh browser with cache cleared and the site at https://rahulshettyacademy.com/seleniumPractise/#/
    - expect: Site loads the product gallery and header with search and cart controls.
  2. In the search box, type a product name (e.g., 'Tomato' or 'Brocolli')
    - expect: Product list filters to show matching product(s).
    - expect: At least one visible product card matches the search term.
  3. Click 'ADD TO CART' on the matching product
    - expect: The product counter (cart badge) increments to 1.
    - expect: A toast/visual indicator briefly confirms item added (if present).
  4. Open the cart/mini-cart and click 'PROCEED TO CHECKOUT'
    - expect: Cart page shows the product with correct name, unit price and quantity 1.
    - expect: Subtotal equals unit price × quantity.
  5. On checkout, complete the order flow (apply promo if available, accept terms, click 'Place Order' / equivalent)
    - expect: Order confirmation/success message appears or next payment step displayed.
    - expect: Order summary lists purchased items and total cost.

#### 1.2. Add multiple different products and update quantities

**File:** `tests/greenKart/add-multiple-products.spec.ts`

**Steps:**
  1. Start on the home page
    - expect: Product grid visible.
  2. Add three different products by clicking 'ADD TO CART' on each
    - expect: Cart badge increases accordingly to 3.
    - expect: Mini-cart lists the three items.
  3. Open cart and increase quantity of one product to 3 using '+' or quantity control
    - expect: Quantity updates to 3 in cart and subtotal recalculates accordingly.
  4. Proceed to checkout and verify totals
    - expect: Line totals reflect quantity × unit price.
    - expect: Grand total equals sum of line totals (plus/minus shipping/tax if shown).

#### 1.3. Remove product from cart and validate empty cart state

**File:** `tests/greenKart/remove-product.spec.ts`

**Steps:**
  1. Add a product to cart
    - expect: Cart count increments to 1.
  2. Open cart and click 'Remove' or set quantity to 0 for that product
    - expect: Product is removed from the cart UI.
    - expect: Cart count decrements to 0 and empty-cart message or empty state is shown.

### 2. Search & Filters

**Seed:** `tests/seed.spec.ts`

#### 2.1. Search using full product name

**File:** `tests/greenKart/search-fullname.spec.ts`

**Steps:**
  1. Assumption: home page is loaded
    - expect: Search input visible.
  2. Enter a full known product name (e.g., 'Cucumber') and trigger search
    - expect: Results list shows exact or closely matching item(s).
    - expect: Non-matching items are hidden.

#### 2.2. Search using partial text and case-sensitivity check

**File:** `tests/greenKart/search-partial.spec.ts`

**Steps:**
  1. Enter partial text (e.g., 'to') into the search box
    - expect: Multiple matching products are shown.
    - expect: Search is not case-sensitive (same results for 'To'/'to').
  2. Clear search (x or backspace)
    - expect: Full product list returns.

#### 2.3. No-results search behaviour

**File:** `tests/greenKart/search-noresults.spec.ts`

**Steps:**
  1. Search with a term that doesn't exist (random string)
    - expect: UI displays no-results state (empty grid or helpful message).
    - expect: No Add buttons are available for no-results.

### 3. Cart & Checkout Validations

**Seed:** `tests/seed.spec.ts`

#### 3.1. Apply valid promo code during checkout

**File:** `tests/greenKart/promo-valid.spec.ts`

**Steps:**
  1. Add items to cart and go to checkout
    - expect: Promo input and apply button visible.
  2. Enter a known valid promo code (sample test data: 'rahulshettyacademy' or site-provided code) and click Apply
    - expect: Success message indicating discount applied.
    - expect: Grand total decreases by the expected discount amount or percentage.

#### 3.2. Apply invalid promo code

**File:** `tests/greenKart/promo-invalid.spec.ts`

**Steps:**
  1. On checkout, enter an invalid promo code and click Apply
    - expect: Error message displayed indicating invalid/expired code.
    - expect: Total remains unchanged.

#### 3.3. Checkout validation: mandatory fields and terms acceptance

**File:** `tests/greenKart/checkout-validation.spec.ts`

**Steps:**
  1. From cart, attempt to place order without accepting terms or without required checkout selections (country, address if applicable)
    - expect: Clear validation messages shown for missing consent or required fields.
    - expect: Order cannot be completed until validations are satisfied.

### 4. Offers & Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 4.1. Rapid add/remove items for race-condition detection

**File:** `tests/greenKart/rapid-add-remove.spec.ts`

**Steps:**
  1. Quickly add and remove the same product multiple times (10+ operations)
    - expect: Cart count remains accurate and UI does not freeze.
    - expect: No duplicate phantom items persist after final state.
  2. Reload page and confirm cart consistency
    - expect: Cart state matches persisted expectation or resets to fresh state per application design.

#### 4.2. Large quantity order and pricing accuracy

**File:** `tests/greenKart/large-quantity.spec.ts`

**Steps:**
  1. Add a single product and set quantity to a large number (e.g., 100)
    - expect: Cart updates without UI overflow.
    - expect: Line total and grand total compute correctly with no rounding errors.
  2. Attempt to order more than inventory (if limitation exists)
    - expect: If inventory limit enforced, an informative message appears and prevents exceeding the limit.

### 5. Accessibility & Responsiveness

**Seed:** `tests/seed.spec.ts`

#### 5.1. Keyboard navigation and focus order

**File:** `tests/greenKart/accessibility-keyboard.spec.ts`

**Steps:**
  1. Tab through header, search, product cards, add-to-cart buttons and cart controls
    - expect: Focus follows a logical order and Add-to-cart buttons reachable via keyboard.
    - expect: No keyboard-trapped elements.

#### 5.2. Responsive layout checks (mobile/desktop)

**File:** `tests/greenKart/responsive.spec.ts`

**Steps:**
  1. Set viewport to mobile dimensions (e.g., 360x800) and load the site
    - expect: Product grid stacks appropriately and menu/search remain accessible.
    - expect: Cart and checkout flows function in mobile layout.
  2. Set viewport to tablet and large desktop sizes and verify layout
    - expect: UI scales without overlapping elements and actions remain functional.
