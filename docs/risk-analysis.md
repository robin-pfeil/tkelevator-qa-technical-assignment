# Risk Analysis

The risk analysis is based on the business workflows identified during the initial exploration of the SauceDemo application.

The application's primary end-to-end user journey is:

**Login → Browse products → View/select product → Add to cart → Review cart → Checkout → Confirm order → Logout**

Since the main purpose of the application is to allow a user to select products and successfully complete an order, workflows are prioritized primarily according to how strongly a failure would affect or prevent completion of this journey.

This initial assessment considers:

* **Business impact** — How strongly would a failure affect the application's main purpose?
* **User impact** — Would the failure prevent or significantly disrupt the user from completing their goal?
* **Dependency** — Do other important workflows depend on this functionality?
* **Regression value** — Would repeated verification of this workflow provide meaningful confidence after application changes?

The priorities defined here apply to the workflows as a whole. Individual test scenarios within a workflow may receive different priorities during test-case design.

## Priority Levels

### Critical

A failure prevents the user from completing the application's primary business journey or makes a core part of the application unusable.

### High

A failure significantly affects the primary user journey but may not completely prevent the user from completing it.

### Medium

A failure affects usability or supporting functionality but has a lower impact on the application's primary business goal.

## Workflow Risk Assessment

| Business Workflow                   | Priority | Rationale                                                                                                                                                                                                                                                  |
| ----------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authentication & Session Management | Critical | Authentication is the entry point to the application. If a valid user cannot log in, the complete shopping journey becomes unavailable. Session handling and logout are also important for maintaining correct user access.                                |
| Product Browsing & Discovery        | High     | Users need to view and inspect available products before deciding what to purchase. Failures in this area can significantly affect product selection, although some individual browsing features may not completely prevent an order from being completed. |
| Shopping Cart Management            | Critical | The cart represents the products the user intends to purchase. If products cannot be added, removed, or correctly retained in the cart, the user cannot reliably prepare an order for checkout.                                                            |
| Checkout & Order Completion         | Critical | Checkout directly represents completion of the application's primary business goal. A failure that prevents the user from providing required information, reviewing the order, or completing the purchase blocks the main end-to-end journey.              |
| Application Navigation              | Medium   | Navigation allows users to move between the different sections of the application. Incorrect navigation can disrupt the user journey, but many navigation functions support rather than directly perform the core purchasing process.                      |

## Key Risks by Workflow

### Authentication & Session Management

Key risks include:

* Valid users are unable to log in
* Invalid or locked-out users gain access
* Authentication state is not handled correctly
* Users cannot log out successfully
* Protected application pages can be accessed without authentication

Because authentication controls access to all other core workflows, major failures in this area have a high impact on the complete application.

### Product Browsing & Discovery

Key risks include:

* Products are missing from the inventory
* Product information such as name, description, image, or price is incorrect
* Product sorting produces an incorrect order
* The wrong product detail page is opened
* Information differs between the product list and product detail page

These failures can affect the user's ability to make an informed purchasing decision, but not every browsing defect necessarily prevents completion of an order.

### Shopping Cart Management

Key risks include:

* Products cannot be added to the cart
* The wrong product is added or removed
* Cart contents do not match the user's selections
* Multiple selected products are not handled correctly
* Cart state is lost while navigating through the application
* The user cannot proceed from the cart to checkout

Incorrect cart behavior has direct impact on what the user intends to purchase and therefore represents a critical business risk.

### Checkout & Order Completion

Key risks include:

* Checkout cannot be started
* Required customer information is accepted or rejected incorrectly
* Selected products differ between the cart and checkout overview
* Product prices or totals are incorrect
* The order cannot be completed
* A successful order is not clearly confirmed

Checkout receives the highest level of attention because failures here can prevent completion of the application's main business objective after the user has already completed the preceding steps.

### Application Navigation

Key risks include:

* Navigation options lead to incorrect application sections
* Users cannot return to the product inventory
* The shopping cart cannot be reached through the available navigation
* Cancelling checkout leads to an unexpected page
* The About link does not lead to the expected destination
* Navigation unexpectedly changes or loses application state

Although navigation supports the complete user experience, most navigation failures have a lower direct business impact than failures in authentication, cart management, or checkout.

## Prioritization Summary

The highest testing priority is given to workflows whose failure would prevent the user from completing the primary shopping journey.

**Critical**

* Authentication & Session Management
* Shopping Cart Management
* Checkout & Order Completion

**High**

* Product Browsing & Discovery

**Medium**

* Application Navigation

This prioritization will be used as an input for manual test design. Higher-risk workflows will receive greater test coverage, particularly around successful core paths, negative scenarios, data consistency, and failures that could block the end-to-end purchase journey.
