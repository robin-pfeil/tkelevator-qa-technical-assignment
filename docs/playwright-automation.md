# Playwright Automation

This document describes the setup, configuration, architecture, and implementation decisions for the automated testing portion of the SauceDemo QA assignment.

The document will evolve together with the automation project as additional test coverage and framework improvements are introduced.

## Technology

The automation project uses:

* **Playwright Test** for end-to-end browser automation
* **JavaScript** as the programming language
* **Node.js** as the JavaScript runtime
* **npm** for dependency management
* **Visual Studio Code** as the development environment

JavaScript was selected because it is explicitly relevant to the skills described for the role and is fully supported by Playwright.

The official Playwright Test extension for Visual Studio Code is used as an additional development and debugging tool.

## Project Location

The Playwright project is contained inside the `automated-tests/` directory.

This keeps the automated test implementation and its dependencies separate from the manual testing artifacts and higher-level project documentation.

The initial structure is:

```text
automated-tests/
├── tests/
├── node_modules/
├── package.json
├── package-lock.json
└── playwright.config.js
```

Additional directories such as page objects, fixtures, and test data will be introduced when they are required by the automation implementation.

## Initial Setup

### Prerequisites

The local development environment requires:

* Node.js LTS
* npm
* Visual Studio Code
* Playwright Test for Visual Studio Code extension (recommended)

The Node.js and npm installations can be verified using:

```bash
node --version
npm --version
```

### Playwright Installation

The Playwright project was initialized from inside the `automated-tests/` directory using:

```bash
npm init playwright@latest
```

The initial project was configured with:

* **JavaScript** as the programming language
* `tests` as the test directory
* Playwright browser installation enabled
* GitHub Actions generation disabled

Keeping CI/CD out of the initial setup allows the automation framework to be developed and verified locally before automated pipeline execution is added.

## Git Configuration

Generated dependencies, environment files, Playwright reports, and test execution artifacts are excluded from version control through the project's root `.gitignore`.

Examples include:

```text
node_modules/
.env
playwright-report/
test-results/
blob-report/
```

Dependency definitions such as `package.json` and `package-lock.json` remain version controlled so that the automation environment can be reproduced consistently.

## Playwright Configuration

The initial Playwright configuration is intentionally kept minimal while the core automation framework is being developed.

The configuration currently includes:

* **Test directory:** `./tests`
* **Base URL:** `https://www.saucedemo.com/`
* **Browser:** Chromium using the `Desktop Chrome` device profile
* **Reporter:** Playwright HTML reporter
* **Tracing:** Enabled on the first retry

### Base URL

The SauceDemo application URL is configured centrally using Playwright's `baseURL`.

This allows tests and page objects to use relative paths such as:

```js
page.goto('/');
```

instead of repeating the complete application URL throughout the test suite.

Centralizing the target URL also makes the test environment easier to change or configure later.

### Browser Configuration

The initial automated test suite targets **Chromium** using Playwright's `Desktop Chrome` device configuration.

Cross-browser execution is intentionally not enabled during the initial framework setup.

After the core suite is implemented and stable, additional Playwright projects may be introduced for:

* Firefox
* WebKit

This allows cross-browser coverage to be added as a separate improvement without increasing the complexity of the initial framework implementation.

### Reporting

The built-in Playwright HTML reporter is enabled.

This provides a readable test execution report containing information about executed tests, results, failures, and supporting diagnostic information.

Reporting may be expanded later if additional reporting or dashboard functionality provides meaningful value.

### Tracing

Playwright tracing is configured using:

```text
on-first-retry
```

This allows additional diagnostic information to be collected when a test is retried.

Retries are not currently enabled as part of the initial local configuration. Retry behavior may be configured later when CI/CD execution and failure-handling strategy are introduced.

## Initial Automation Approach

The first automation milestone focuses on establishing a clean and working Playwright foundation before implementing the selected test cases.

The initial setup therefore focuses on:

* Playwright installation
* JavaScript project configuration
* Central SauceDemo base URL configuration
* Chromium browser execution
* HTML test reporting
* Test tracing configuration
* Separation of automated test code from other repository artifacts
* Exclusion of generated files and dependencies from version control

The framework will be expanded incrementally as automated test cases are implemented.
