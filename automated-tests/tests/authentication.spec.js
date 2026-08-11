import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryListingPage } from '../pages/InventoryListingPage';
import { users } from '../test-data/users';

test.describe('Authentication', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('TC-01: successful login with valid credentials @smoke @regression', async ({ page }) => {
        await loginPage.login(users.standard.username, users.standard.password);
        await expect(page).toHaveURL('/inventory.html');

        const inventoryListingPage = new InventoryListingPage(page);
        await inventoryListingPage.expectReady();
    });

    test('TC-11: unsuccessful login with invalid credentials @regression', async ({ page }) => {
        await loginPage.login('invalid_user', 'mot_so_secret_sauce');
        await expect(page).toHaveURL('/');
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
    });

    test('TC-02: locked-out user cannot log in @regression', async ({ page }) => {
        await loginPage.login(users.lockedOut.username, users.lockedOut.password);
        await expect(page).toHaveURL('/');
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });
});