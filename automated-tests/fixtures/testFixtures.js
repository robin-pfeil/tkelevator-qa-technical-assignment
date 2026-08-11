import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryListingPage } from '../pages/InventoryListingPage';
import { users } from '../test-data/users';

export const test = base.extend({
    authenticatedInventoryPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(users.standard.username, users.standard.password);

        const inventoryListingPage = new InventoryListingPage(page);
        await inventoryListingPage.expectReady();

        await use(inventoryListingPage);
    },
});

export { expect } from '@playwright/test';