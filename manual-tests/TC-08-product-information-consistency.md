# TC-08 — Product Details Match the Inventory Listing

**Test Case ID:** TC-08
**Business Workflow:** Product Browsing & Discovery
**Priority:** High

## Test Objective

Verify that product information displayed on an individual product detail page is consistent with the information shown for the same product on the inventory page.

## Preconditions

* The user is logged in as `standard_user`.
* The inventory page is displayed.

## Test Data

* **Product:** `Sauce Labs Backpack`

## Test Steps

1. Locate `Sauce Labs Backpack` on the inventory page.
2. Observe its product name.
3. Observe its description.
4. Observe its price.
5. Observe its product image.
6. Open the `Sauce Labs Backpack` product detail page.
7. Compare the displayed product information with the information previously shown on the inventory page.

## Expected Results

* The correct `Sauce Labs Backpack` detail page is opened.
* The product name, description, and price match the information displayed on the inventory page.
* The displayed product image represents the same product as on the inventory page.
* No information belonging to a different product is displayed.
