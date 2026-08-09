# TC-01 — Successful Login With Valid Credentials

**Test Case ID:** TC-01
**Business Workflow:** Authentication & Session Management
**Priority:** Critical

## Test Objective

Verify that an authorized standard user can successfully log in to the application using valid credentials and access the product inventory.

## Preconditions

* The SauceDemo login page is available at https://www.saucedemo.com/
* The user is currently logged out

## Test Data

* **Username:** `standard_user`
* **Password:** `secret_sauce`

The credentials are publicly provided by the SauceDemo application for testing purposes.

## Test Steps

1. Open https://www.saucedemo.com/
2. Enter `standard_user` in the username field.
3. Enter `secret_sauce` in the password field.
4. Click the **Login** button.

## Expected Results

* The login is successful.
* No authentication error message is displayed.
* The user is redirected to the inventory page.
* The available product list is displayed.
* The user can access the authenticated application functionality.
