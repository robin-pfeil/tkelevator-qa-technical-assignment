# TC-03 — Add Product to Shopping Cart

**Test Case ID:** TC-03
**Business Workflow:** Shopping Cart Management
**Priority:** Critical

## Test Objective

Verify that a logged-in user can add a product to the shopping cart and that the selected product is correctly reflected in the cart.

## Preconditions

* The user is logged in as `standard_user`.
* The inventory page is displayed.
* The shopping cart is empty.

## Test Data

* **Product:** `Sauce Labs Backpack`

## Test Steps

1. Locate `Sauce Labs Backpack` on the inventory page.
2. Click the **Add to cart** button for the product.
3. Observe the shopping cart badge.
4. Open the shopping cart.

## Expected Results

* `Sauce Labs Backpack` is successfully added to the cart.
* The product's **Add to cart** button changes to **Remove**.
* The shopping cart badge displays `1`.
* The shopping cart page contains `Sauce Labs Backpack`.
* The product name, description, and price in the cart match the information displayed on the inventory page.
