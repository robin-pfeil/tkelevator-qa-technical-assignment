import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryListingPage } from '../pages/InventoryListingPage';

test.describe('Authentication', () => {
    test('TC-01: successful login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL('/inventory.html');

        const inventoryListingPage = new InventoryListingPage(page);
        await inventoryListingPage.expectReady();
    });

    test('TC-02: locked-out user cannot log in', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('locked_out_user', 'secret_sauce');
        await expect(page).toHaveURL('/');
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });
});