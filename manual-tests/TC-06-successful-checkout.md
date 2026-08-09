# TC-06 — Complete a Successful Checkout

**Test Case ID:** TC-06
**Business Workflow:** Checkout & Order Completion
**Priority:** Critical

## Test Objective

Verify that a user can successfully complete the full checkout process with a product in the shopping cart and valid customer information.

## Preconditions

* The user is logged in as `standard_user`.
* The inventory page is displayed.
* The shopping cart is empty.

## Test Data

### Product

* **Product:** `Sauce Labs Backpack`

### Customer Information

* **First Name:** `John`
* **Last Name:** `Doe`
* **Postal Code:** `10115`

## Test Steps

1. Add `Sauce Labs Backpack` to the shopping cart.
2. Open the shopping cart.
3. Verify that the selected product is displayed.
4. Click **Checkout**.
5. Enter `John` in the first-name field.
6. Enter `Doe` in the last-name field.
7. Enter `10115` in the postal-code field.
8. Click **Continue**.
9. Review the checkout overview.
10. Verify that the selected product, payment information, shipping information, and pricing information are displayed correctly.
11. Click **Finish**.
12. Verify that the order confirmation page and success information are displayed.

## Expected Results

* The checkout information page is displayed after starting checkout.
* The entered customer information is accepted.
* The user is taken to the checkout overview after clicking **Continue**.
* `Sauce Labs Backpack` is displayed in the checkout overview.
* The product name, description, and price match the selected cart item.
* The payment information is displayed.
* The shipping information is displayed.
* The item total is displayed as `$29.99`.
* The tax is displayed as `$2.40`.
* The total is displayed as `$32.39`.
* The total correctly equals the item total plus tax.
* Clicking **Finish** successfully completes the order.
* The order confirmation page is displayed with `Checkout: Complete!`.
* The heading `Thank you for your order!` is displayed.
* A green success icon with a checkmark is displayed.
* The dispatch message `Your order has been dispatched, and will arrive just as fast as the pony can get there!` is displayed.
* The **Back Home** button is displayed and available.
* The **Generate PDF order** button is displayed and available.
