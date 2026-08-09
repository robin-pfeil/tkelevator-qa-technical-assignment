import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryListingPage } from '../pages/InventoryListingPage';

test('TC-01: successful login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('/inventory.html');

    const inventoryListingPage = new InventoryListingPage(page);
    await inventoryListingPage.expectReady();
});