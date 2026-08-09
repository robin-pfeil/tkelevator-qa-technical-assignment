# SauceDemo QA Technical Assignment

This repository contains my solution for a QA Working Student technical assignment based on the [SauceDemo](https://www.saucedemo.com/) web application.

The project demonstrates my approach to **risk-based test design, manual testing, and end-to-end test automation using Playwright**.

## Objectives

The main objectives of this project are to:

* Explore the SauceDemo application and identify its most important business workflows.
* Design meaningful manual test cases based on business impact and risk.
* Automate selected high-value scenarios using Playwright.
* Build the automation solution with maintainability, readability, and scalability in mind.
* Document the testing strategy, assumptions, architecture, and execution process.

## Application Under Test

**Application:** SauceDemo
**URL:** https://www.saucedemo.com/

SauceDemo is a sample e-commerce web application that will be used to explore typical user journeys and demonstrate functional testing and end-to-end test automation practices.

## Testing Strategy

The project follows a **risk-based testing approach**.

Testing effort will be prioritized according to factors such as:

* **Business impact** — How important is the functionality to the application's core user journeys?
* **Failure probability** — How likely is the functionality to contain defects?
* **User impact** — How significantly would a defect affect a user's ability to complete their goal?
* **Regression value** — Would the scenario provide meaningful value when repeatedly verified through automation?

The specific business workflows, risks, priorities, and resulting test coverage will be identified during the exploration and test design phases of the assignment.

## Key Design Principle

The goal of this project is not simply to create the largest possible test suite.

The focus is on creating a **small, meaningful, maintainable, and risk-focused test suite** that provides confidence in the application's most important user journeys.

## Project Documentation

* [Business Workflows](docs/business-workflows.md) — Identification of the application's most important business workflows and primary end-to-end user journey.
* [Risk Analysis](docs/risk-analysis.md) — Workflow-level risk assessment and prioritization based on business impact, user impact, dependencies, and regression value.
* [Manual Test Strategy](docs/manual-test-strategy.md) — Risk-based approach, selection criteria, and rationale for the manual test coverage.
* [Manual Test Cases](manual-tests/README.md) — Overview and individual manual test cases covering the selected SauceDemo workflows.
* [Playwright Automation](docs/playwright-automation.md) — Setup, configuration, and implementation decisions for the Playwright automation project.
