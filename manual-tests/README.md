# Manual Test Cases

This directory contains the manual test cases selected for the SauceDemo application.

The test cases were derived from the project's [Manual Test Strategy](../docs/manual-test-strategy.md) and are prioritized according to the previously identified business risks.

## Selected Test Coverage

| ID                                                | Test Case                                      | Business Workflow                   | Priority |
| ------------------------------------------------- | ---------------------------------------------- | ----------------------------------- | -------- |
| [TC-01](TC-01-successful-login.md)                | Successful login with valid credentials        | Authentication & Session Management | Critical |
| [TC-02](TC-02-locked-out-user.md)                 | Locked-out user cannot log in                  | Authentication & Session Management | Critical |
| [TC-03](TC-03-add-product-to-cart.md)             | Add a product to the shopping cart             | Shopping Cart Management            | Critical |
| [TC-04](TC-04-modify-multiple-cart-items.md)      | Add multiple products and remove one           | Shopping Cart Management            | Critical |
| [TC-05](TC-05-cart-state-during-navigation.md)    | Cart contents remain correct during navigation | Shopping Cart Management            | Critical |
| [TC-06](TC-06-successful-checkout.md)             | Complete a successful checkout                 | Checkout & Order Completion         | Critical |
| [TC-07](TC-07-required-checkout-information.md)   | Required checkout information is validated     | Checkout & Order Completion         | Critical |
| [TC-08](TC-08-product-information-consistency.md) | Product details match the inventory listing    | Product Browsing & Discovery        | High     |
| [TC-09](TC-09-product-sorting.md)                 | Products can be sorted correctly               | Product Browsing & Discovery        | High     |
| [TC-10](TC-10-application-navigation.md)          | Navigate between application sections          | Application Navigation              | Medium   |

## Coverage Summary

* **Critical:** 7 test cases
* **High:** 2 test cases
* **Medium:** 1 test case
* **Total:** 10 test cases

The majority of the test coverage focuses on Critical workflows while still including High- and Medium-priority functionality to provide broader risk-based coverage.
