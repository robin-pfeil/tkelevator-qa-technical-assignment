import { expect } from '@playwright/test';

export class InventoryListingPage {

    constructor(page) {
        this.page = page;
        this.inventoryList = page.getByTestId('inventory-list');
    }

    async goto() {
        await this.page.goto('/inventory.html');
    }

    async expectReady() {
        return expect(this.inventoryList).toBeVisible();
    }
}