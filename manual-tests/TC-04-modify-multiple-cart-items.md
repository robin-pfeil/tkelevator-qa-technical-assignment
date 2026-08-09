# TC-04 — Add Multiple Products and Remove One

**Test Case ID:** TC-04
**Business Workflow:** Shopping Cart Management
**Priority:** Critical

## Test Objective

Verify that a user can add multiple products to the shopping cart, remove one of them, and retain the correct remaining cart contents.

## Preconditions

* The user is logged in as `standard_user`.
* The inventory page is displayed.
* The shopping cart is empty.

## Test Data

* **Product 1:** `Sauce Labs Backpack`
* **Product 2:** `Sauce Labs Bike Light`

## Test Steps

1. Add `Sauce Labs Backpack` to the shopping cart.
2. Add `Sauce Labs Bike Light` to the shopping cart.
3. Verify the shopping cart badge.
4. Open the shopping cart.
5. Verify that both selected products are displayed.
6. Remove `Sauce Labs Bike Light` from the shopping cart.

## Expected Results

* Both products are successfully added to the shopping cart.
* Before removing a product, the shopping cart badge displays `2`.
* Both selected products are displayed in the cart with the expected product information.
* `Sauce Labs Bike Light` is successfully removed.
* `Sauce Labs Backpack` remains in the shopping cart.
* The shopping cart badge updates from `2` to `1`.
* The removed product is no longer displayed in the cart.
