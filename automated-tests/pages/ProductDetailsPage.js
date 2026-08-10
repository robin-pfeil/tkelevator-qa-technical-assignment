import { expect } from '@playwright/test';

export class ProductDetailsPage {

    constructor(page) {
        this.page = page;
        this.backToProductsButton = page.getByRole('button', { name: 'Back to products' });
    }

    async expectReady() {
        await expect(this.backToProductsButton).toBeVisible();
    }

    async backToProducts() {
        await this.backToProductsButton.click();
    }
}