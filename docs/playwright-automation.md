# Playwright Automation

This document describes the setup, configuration, architecture, execution strategy, and implementation decisions for the automated testing portion of the SauceDemo QA assignment.

The automation suite focuses on selected high-value workflows identified through the manual test design and risk analysis. The framework is intentionally kept small and maintainable while demonstrating reusable test architecture, meaningful assertions, test-data management, reporting, fixtures, test tagging, and continuous integration.

## Technology

The automation project uses:

* **Playwright Test** for end-to-end browser automation
* **JavaScript** as the programming language
* **Node.js** as the JavaScript runtime
* **npm** for dependency management
* **Visual Studio Code** as the development environment
* **GitHub Actions** for continuous integration
* **Playwright HTML Reporter** for execution reporting

JavaScript was selected because it is relevant to the technical requirements of the role and is fully supported by Playwright.

The official Playwright Test extension for Visual Studio Code is also used as a development and debugging aid.

---

## Project Location

The Playwright project is contained inside the `automated-tests/` directory.

This keeps automated test implementation and dependencies separate from the manual testing artifacts and higher-level project documentation.

The current structure is organized approximately as follows:

```text
automated-tests/
├── components/
│   └── ProductItem.js
├── fixtures/
│   └── testFixtures.js
├── pages/
│   ├── CartPage.js
│   ├── CheckoutCompletePage.js
│   ├── CheckoutInformationPage.js
│   ├── CheckoutOverviewPage.js
│   ├── InventoryListingPage.js
│   ├── LoginPage.js
│   └── ProductDetailsPage.js
├── test-data/
│   └── users.js
├── tests/
│   ├── authentication.spec.js
│   ├── cart.spec.js
│   └── checkout.spec.js
├── package.json
├── package-lock.json
└── playwright.config.js
```

Generated directories such as `node_modules/`, `playwright-report/`, and `test-results/` are excluded from version control.

---

## Prerequisites

The local development environment requires:

* Node.js LTS
* npm
* Git
* Visual Studio Code or another suitable editor
* Playwright-supported browser dependencies

The Node.js and npm installations can be verified using:

```bash
node --version
npm --version
```

---

## Installation

The Playwright project was originally initialized from inside the `automated-tests/` directory using:

```bash
npm init playwright@latest
```

The initial project was configured with:

* JavaScript
* `tests` as the test directory
* Playwright browser installation enabled
* GitHub Actions generation disabled during the initial setup

CI was intentionally introduced later, after the initial automation suite had been implemented and verified locally.

To reproduce the project dependencies after cloning the repository:

```bash
cd automated-tests
npm ci
```

Install the required Playwright browsers and system dependencies using:

```bash
npx playwright install --with-deps
```

---

## Git Configuration

Generated dependencies, environment files, reports, and test execution artifacts are excluded from version control through the project's root `.gitignore`.

Examples include:

```text
node_modules/
.env
playwright-report/
test-results/
blob-report/
```

Dependency definitions such as `package.json` and `package-lock.json` remain version controlled so that the automation environment can be reproduced consistently.

The SauceDemo credentials used by the suite are public test credentials provided by the application and are managed as test data rather than environment secrets.

---

## Playwright Configuration

The Playwright configuration is intentionally kept focused on the requirements of the assignment.

The configuration includes:

* **Test directory:** `./tests`
* **Base URL:** `https://www.saucedemo.com/`
* **Browser:** Chromium using the `Desktop Chrome` device profile
* **Reporter:** Playwright HTML reporter
* **Tracing:** Enabled on the first retry
* **Test ID attribute:** `data-test`

### Base URL

The SauceDemo application URL is configured centrally using Playwright's `baseURL`.

This allows tests and page objects to use relative paths such as:

```js
page.goto('/');
```

instead of repeating the complete application URL throughout the suite.

Centralizing the target URL also makes future environment changes easier.

### Browser Configuration

The current automated test suite targets **Chromium** using Playwright's Desktop Chrome device configuration.

Cross-browser execution was deliberately not included in the core implementation because the assignment focuses primarily on test design, automation structure, maintainability, and risk-based coverage.

Additional browser projects such as Firefox or WebKit could be introduced later if broader compatibility testing were required.

### Test ID Configuration

SauceDemo provides `data-test` attributes for many UI elements.

Playwright is configured to treat these as test IDs, allowing locators such as:

```js
page.getByTestId('inventory-list');
```

This keeps selectors readable and avoids depending on fragile CSS or layout-specific selectors.

---

## Automation Architecture

The test suite uses a Page Object Model combined with a reusable UI component object.

The main responsibilities are separated as follows:

```text
Tests
→ define business workflows and assertions

Page Objects
→ represent pages and page-specific actions

ProductItem Component
→ represents repeated product UI structure

Fixtures
→ provide reusable test prerequisites

Test Data
→ centralizes reusable user personas
```

This structure was introduced incrementally as duplication became visible rather than creating abstractions before they were needed.

---

## Page Object Model

Page objects encapsulate page-specific locators and user actions.

Examples include:

* `LoginPage`
* `InventoryListingPage`
* `CartPage`
* `ProductDetailsPage`
* `CheckoutInformationPage`
* `CheckoutOverviewPage`
* `CheckoutCompletePage`

Page objects are responsible for actions such as:

```js
await inventoryListingPage.addProductToCart(productName);
await inventoryListingPage.openCart();
await cartPage.checkout();
await checkoutInformationPage.continueCheckout();
```

Business assertions remain primarily in the test files so that the expected behavior remains visible at test level.

Page readiness checks such as `expectReady()` are kept within page objects because they represent a reusable definition of when a page has loaded sufficiently for interaction.

---

## Reusable Product Component

Product information is displayed using the same general structure across the inventory, cart, and checkout overview pages.

To avoid duplicating product locators and detail extraction across multiple page objects, a reusable `ProductItem` component was introduced.

The page object is responsible for locating the correct product:

```js
getProduct(productName) {
    const productLocator = this.productList
        .getByTestId('inventory-item')
        .filter({ hasText: productName });

    return new ProductItem(productLocator);
}
```

The `ProductItem` component receives the already-scoped product locator and exposes common product information such as:

* product root
* name
* description
* price
* combined product detail extraction

This keeps locator ownership clear:

```text
Page Object
→ knows where to find the product

ProductItem
→ knows the internal structure of the product
```

The component was introduced only after the same product-handling logic was required across multiple pages.

---

## Test Data

Reusable SauceDemo users are stored centrally in:

```text
test-data/users.js
```

This avoids repeating usernames and passwords throughout the tests and gives the personas semantic names.

Examples include:

* standard user
* locked-out user
* other SauceDemo test personas

Authentication tests can therefore use test data such as:

```js
users.standard.username
users.standard.password
```

rather than hardcoded credentials inside individual tests.

Invalid credentials used specifically for negative authentication testing remain test-specific where appropriate.

---

## Custom Fixtures

A custom Playwright fixture named `authenticatedInventoryPage` is used by tests that require an already authenticated standard user on the inventory page.

The fixture performs the shared prerequisite:

```text
Open login page
→ authenticate using the standard test user
→ create InventoryListingPage
→ verify inventory page readiness
→ provide the page object to the test
```

Tests can then declare the fixture directly:

```js
test('example', async ({ page, authenticatedInventoryPage }) => {
    const inventoryListingPage = authenticatedInventoryPage;
});
```

The fixture is used by cart and checkout tests because authentication is only a prerequisite for those scenarios.

Authentication tests deliberately do not use the fixture because login behavior itself is what those tests are validating.

Additional workflow fixtures were not introduced because actions such as adding products, navigating to the cart, and performing checkout are meaningful business steps that should remain visible inside the test cases.

---

## Automated Test Coverage

The current automated suite covers selected scenarios from the manual test design.

Examples include:

* successful authentication
* locked-out user authentication
* invalid credential validation
* adding a product to the cart
* cart state persistence during navigation
* successful checkout
* required checkout information validation

The automated cases were selected primarily based on:

* business impact
* user impact
* workflow dependency
* regression value
* suitability for reliable automation

The automation suite is not intended to replace the complete manual test design.

---

## Assertions

The tests use Playwright locator assertions where possible, for example:

```js
await expect(cartProduct.root).toBeVisible();
await expect(inventoryListingPage.cartBadge).toHaveText('1');
```

These assertions benefit from Playwright's built-in waiting and retry behavior.

Plain JavaScript assertions are used when comparing already-extracted data:

```js
expect(cartProductDetails).toEqual(inventoryProductDetails);
```

The successful checkout test also validates numeric relationships between:

* product price
* item subtotal
* tax
* final total

This goes beyond checking that values are merely visible and verifies that the checkout calculation is internally consistent.

---

## Parameterized Validation Testing

Checkout required-field validation is implemented using a data-driven scenario list.

Each validation scenario defines:

* the field being tested
* the supplied checkout values
* the expected validation message

The scenarios are then executed as separate Playwright tests.

This avoids duplicating nearly identical test logic while preserving independent test results for each required field.

---

## Test Tagging

The automated suite uses Playwright tags to support selective test execution.

Two execution tags are currently used:

### `@smoke`

The smoke suite contains a small set of high-value happy-path tests that quickly confirm that the application's most important functionality is operational.

Examples include:

* successful login
* adding a product to the cart
* successful checkout

Smoke tests are intended to provide fast confidence in the critical business journey.

### `@regression`

Regression coverage includes the broader automated suite used to verify that existing functionality continues to behave correctly after changes.

Smoke tests may also carry the `@regression` tag because the smoke suite represents a smaller subset of the overall regression coverage.

Risk priority and execution tags are intentionally treated separately.

For example:

```text
Critical / High / Medium
→ business and user risk

@smoke / @regression
→ execution grouping
```

A Critical test does not automatically need to belong to the smoke suite if it is not required for the smallest meaningful happy-path verification.

---

## Running the Tests

All commands should be executed from inside the `automated-tests/` directory:

```bash
cd automated-tests
```

### Run the complete suite

```bash
npx playwright test
```

### Run a specific test file

```bash
npx playwright test tests/cart.spec.js
```

Example:

```bash
npx playwright test tests/checkout.spec.js
```

### Run smoke tests only

```bash
npx playwright test --grep @smoke
```

### Run regression tests only

```bash
npx playwright test --grep @regression
```

### Run tests in headed mode

```bash
npx playwright test --headed
```

### Run tests using Playwright UI mode

```bash
npx playwright test --ui
```

### Run a specific test by title

```bash
npx playwright test --grep "TC-06"
```

---

## HTML Reporting

The Playwright HTML reporter is enabled in the project configuration.

After a local test run, the report can be opened using:

```bash
npx playwright show-report
```

Generated report files are stored in:

```text
playwright-report/
```

The report directory is excluded from Git because it is generated during execution.

The HTML report provides information including:

* executed tests
* passed and failed tests
* execution duration
* failure details
* traces and other diagnostic information when available

---

## Continuous Integration

The project includes a GitHub Actions workflow located at:

```text
.github/workflows/playwright.yml
```

The workflow runs the Playwright test suite automatically for repository changes and pull requests targeting the main branch.

The workflow performs the following steps:

```text
Checkout repository
→ Set up Node.js
→ Install npm dependencies
→ Install Playwright browsers and system dependencies
→ Run Playwright tests
→ Upload the Playwright HTML report
```

The Playwright commands execute using the `automated-tests/` directory as the working directory.

The full automated suite remains the default CI execution because the current suite is small enough that separating smoke and regression stages would not provide significant execution-time benefits.

The newly introduced tags allow the suite to be separated later if the test volume increases.

---

## CI Test Reports

The GitHub Actions workflow uploads the generated Playwright HTML report as a workflow artifact.

The report is uploaded for completed workflow runs unless the workflow is cancelled.

This makes test results available directly from the GitHub Actions run without committing generated report files to the repository.

The report artifact can be downloaded from the workflow run and inspected locally.

---

## Maintainability Decisions

Several implementation decisions were made specifically to keep the automation suite maintainable without over-engineering it.

### Reuse only after duplication appears

The `ProductItem` component was introduced after product handling was required across multiple pages rather than creating a component before the need was demonstrated.

### Prefer composition over inheritance

The framework does not use a generic `BasePage` hierarchy.

Shared UI behavior is modeled through composition, such as the reusable `ProductItem` component, rather than page inheritance.

### Keep assertions visible

Business assertions remain inside tests wherever practical.

Page objects focus on interaction and page structure rather than hiding the entire expected behavior behind helper methods.

### Keep fixtures focused on prerequisites

The authenticated inventory fixture removes repetitive login setup but does not hide cart or checkout workflows.

### Avoid unnecessary abstraction

Methods or fixtures are not added solely to wrap a single Playwright operation unless they provide a meaningful improvement in readability or reuse.

---

## Future Improvements

Potential improvements, if additional scope is required, include:

* API test automation if SauceDemo exposes meaningful and stable API behavior
* accessibility smoke testing
* Firefox and WebKit projects
* additional test data abstraction where justified
* CI separation between smoke and full regression suites
* expanded reporting or dashboard integration
* additional manual and automated scenarios based on risk

These improvements would be introduced based on testing value rather than solely to increase framework complexity.

---

## Summary

The Playwright automation framework currently provides:

* risk-based automated coverage
* Page Object Model architecture
* reusable UI components
* centralized test data
* custom Playwright fixtures
* parameterized validation testing
* meaningful UI and calculation assertions
* smoke and regression tagging
* HTML test reporting
* GitHub Actions continuous integration

The implementation prioritizes readability, maintainability, reusable structure, and clear separation of responsibilities while keeping the automated tests closely aligned with the business workflows identified during manual test design.
