# TC-09 — Products Can Be Sorted Correctly

**Test Case ID:** TC-09
**Business Workflow:** Product Browsing & Discovery
**Priority:** High

## Test Objective

Verify that the inventory can be sorted correctly using all available product sorting options.

## Preconditions

* The user is logged in as `standard_user`.
* The inventory page is displayed.
* Multiple products with different names and prices are available.

## Test Data

The following sorting options are tested:

| Sort Option         | Expected Order                                 |
| ------------------- | ---------------------------------------------- |
| Name (A to Z)       | Product names in ascending alphabetical order  |
| Name (Z to A)       | Product names in descending alphabetical order |
| Price (low to high) | Product prices in ascending numerical order    |
| Price (high to low) | Product prices in descending numerical order   |

## Test Steps

For each available sorting option:

1. Open the product sorting dropdown.
2. Select the sorting option.
3. Observe the order of all products displayed on the inventory page.
4. Compare the displayed order with the expected sorting rule.

## Expected Results

* Selecting **Name (A to Z)** displays product names in ascending alphabetical order.
* Selecting **Name (Z to A)** displays product names in descending alphabetical order.
* Selecting **Price (low to high)** displays products from the lowest price to the highest price.
* Selecting **Price (high to low)** displays products from the highest price to the lowest price.
* Product information remains associated with the correct product after sorting.
* No products are added, removed, or duplicated as a result of sorting.
