# TC-05 — Cart Contents Remain Correct During Navigation

**Test Case ID:** TC-05
**Business Workflow:** Shopping Cart Management
**Priority:** Critical

## Test Objective

Verify that products added to the shopping cart remain correctly stored while the user navigates through different parts of the application.

## Preconditions

* The user is logged in as `standard_user`.
* The inventory page is displayed.
* The shopping cart is empty.

## Test Data

* **Product:** `Sauce Labs Backpack`

## Test Steps

1. Add `Sauce Labs Backpack` to the shopping cart.
2. Open the shopping cart.
3. Verify that `Sauce Labs Backpack` is displayed.
4. Click **Continue Shopping**.
5. Open the detail page of another product.
6. Return to the inventory page.
7. Observe the shopping cart badge.
8. Open the shopping cart again.

## Expected Results

* `Sauce Labs Backpack` is initially added to the shopping cart successfully.
* Clicking **Continue Shopping** returns the user to the inventory page.
* Navigation to and from another product's detail page does not modify the cart state.
* The shopping cart badge continues to display `1`.
* `Sauce Labs Backpack` is still present in the shopping cart.
* The product information remains unchanged.
