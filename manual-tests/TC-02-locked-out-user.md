# TC-02 — Locked-Out User Cannot Log In

**Test Case ID:** TC-02
**Business Workflow:** Authentication & Session Management
**Priority:** Critical

## Test Objective

Verify that a locked-out user is prevented from logging in to the application and receives an appropriate error message.

## Preconditions

* The SauceDemo login page is available at https://www.saucedemo.com/
* The user is currently logged out

## Test Data

* **Username:** `locked_out_user`
* **Password:** `secret_sauce`

The credentials are publicly provided by the SauceDemo application for testing purposes.

## Test Steps

1. Open https://www.saucedemo.com/
2. Enter `locked_out_user` in the username field.
3. Enter `secret_sauce` in the password field.
4. Click the **Login** button.

## Expected Results

* The login attempt is rejected.
* The user remains on the login page.
* An error message is displayed indicating that the user is locked out: `Epic sadface: Sorry, this user has been locked out.`
* The username and password fields are highlighted in red.
* A red error icon containing a white `X` is displayed in both input fields.
* The user is not given access to the inventory or other authenticated application functionality.
