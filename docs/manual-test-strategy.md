# Manual Test Strategy

This document describes the manual test coverage selected for the SauceDemo application and the reasoning behind the test-case selection.

The test cases are derived from the previously identified [business workflows](./business-workflows.md) and [risk analysis](./risk-analysis.md).

## Test Design Approach

The manual test suite follows a **risk-based testing approach**.

Rather than attempting to cover every possible application behavior equally, the majority of the test effort is focused on workflows whose failure could prevent the user from completing the application's primary end-to-end journey:

**Login → Browse products → View/select product → Add to cart → Review cart → Checkout → Confirm order → Logout**

The selected test cases therefore focus primarily on the Critical workflows identified during the risk analysis:

* Authentication & Session Management
* Shopping Cart Management
* Checkout & Order Completion

Test cases from High- and Medium-priority workflows are also included. Although these workflows have a lower overall business impact, they still contribute to the user experience and can reveal defects that would not be covered by testing only the application's Critical workflows.

The intention is to achieve meaningful coverage with a relatively small test suite rather than maximizing the number of test cases.

## Test Selection Criteria

Test cases were selected based on the following considerations:

* **Business impact** — Does a failure affect the application's primary purchasing journey?
* **User impact** — Could the issue prevent or significantly disrupt the user from completing their goal?
* **Risk priority** — Does the test cover a Critical, High, or Medium-risk workflow?
* **Positive and negative coverage** — Does the suite verify both expected behavior and important failure conditions?
* **State consistency** — Does application data remain correct while the user moves between different stages of the journey?
* **Regression value** — Would repeating the test provide useful confidence after application changes?

## Selected Test Coverage

A total of **10 manual test cases** were selected based on the risk analysis and test selection criteria described above.

The suite consists primarily of Critical test cases while also including High- and Medium-priority scenarios to provide broader functional coverage.

The complete test-case overview and links to the individual test cases are available in the:

**[Manual Test Case Index](../manual-tests/README.md)**


## Coverage Rationale

### Critical Workflows

Most of the test cases target Critical workflows because failures in these areas can prevent the user from completing the application's primary business journey.

Authentication is tested using both a successful login and an unsuccessful login for a locked-out user. This provides positive and negative coverage of the application's entry point.

Shopping cart testing covers adding products, modifying the cart, and maintaining correct cart state while navigating through the application. These scenarios verify that the user's intended purchase remains consistent throughout the shopping journey.

Checkout testing includes both successful order completion and validation of required customer information. This verifies the application's primary success path as well as an important negative scenario.

### High-Priority Workflows

Product browsing and discovery are represented by two test cases.

Product information consistency is tested because users rely on correct product information when making purchasing decisions.

Product sorting is also included because it is an important browsing feature that can affect the user's ability to find and compare products, although a sorting failure does not necessarily prevent an order from being completed.

### Medium-Priority Workflows

Application navigation is represented by one test case.

Navigation has a lower overall business priority than authentication, cart management, or checkout, but users still need to move reliably between application sections. Including navigation coverage ensures that the test suite does not focus exclusively on Critical workflows while ignoring supporting functionality.

## Test Case Structure

Each manual test case will document:

* **Test Case ID**
* **Test Objective**
* **Priority**
* **Preconditions**
* **Test Data**
* **Test Steps**
* **Expected Results**

Where relevant, test cases will also verify that application state and displayed data remain consistent across different stages of the user journey.
