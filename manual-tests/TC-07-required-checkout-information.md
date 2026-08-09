# TC-07 — Required Checkout Information Is Validated

**Test Case ID:** TC-07
**Business Workflow:** Checkout & Order Completion
**Priority:** Critical

## Test Objective

Verify that the application prevents the user from continuing through checkout when required customer information is missing and displays an appropriate validation error.

## Preconditions

* The user is logged in as `standard_user`.
* At least one product is present in the shopping cart.
* The checkout information page is displayed.

## Test Data

| Scenario            | First Name | Last Name | Postal Code | Expected Error                   |
| ------------------- | ---------- | --------- | ----------- | -------------------------------- |
| Missing first name  | Empty      | `Doe`     | `10115`     | `Error: First Name is required`  |
| Missing last name   | `John`     | Empty     | `10115`     | `Error: Last Name is required`   |
| Missing postal code | `John`     | `Doe`     | Empty       | `Error: Postal Code is required` |

## Test Steps

Repeat the following steps for each test-data scenario:

1. Enter the values defined for the scenario into the checkout information fields.
2. Leave the specified required field empty.
3. Click **Continue**.
4. Observe the validation behavior displayed error message.

## Expected Results

For each scenario:

* The user is prevented from continuing to the checkout overview.
* The user remains on the checkout information page.
* The appropriate validation error message is displayed for the missing required field.
* The first name, last name, and postal code fields are underlined in red.
* A red error icon containing a white X is displayed in each checkout information field.
* The checkout cannot proceed until all required information is provided.
