# TC-10 — Navigate Between Application Sections

**Test Case ID:** TC-10
**Business Workflow:** Application Navigation
**Priority:** Medium

## Test Objective

Verify that the application's primary navigation controls lead the user to the expected destinations without unexpectedly changing application state.

## Preconditions

* The user is logged in as `standard_user`.
* The inventory page is displayed.

## Test Steps

1. Open an individual product detail page.
2. Open the application menu.
3. Select **All Items**.
4. Verify the displayed application section.
5. Open the shopping cart using the cart icon.
6. Verify the displayed application section.
7. Return to the inventory by clicking the **Continue Shopping** button.
8. Open the application menu.
9. Select **About**.
10. Verify that the expected Sauce Labs information page is opened.

## Expected Results

* Selecting **All Items** navigates the user to the inventory page.
* Clicking the shopping cart icon opens the shopping cart page.
* Clicking **Continue Shopping** returns the user to the inventory page.
* Selecting **About** opens the expected Sauce Labs information page.
* Navigation actions do not produce unexpected errors.
* Application state is not unexpectedly modified when moving between sections.
