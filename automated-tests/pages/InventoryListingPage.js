import { expect } from '@playwright/test';

export class InventoryListingPage {

    constructor(page) {
        this.page = page;
        this.inventoryList = page.getByTestId('inventory-list');
        this.cartIcon = page.getByTestId('shopping-cart-link');
        this.cartBadge = this.cartIcon.getByTestId('shopping-cart-badge');
    }

    async goto() {
        await this.page.goto('/inventory.html');
    }

    async expectReady() {
        await expect(this.inventoryList).toBeVisible();
    }

    getProduct(name) {
        return this.inventoryList.getByTestId('inventory-item').filter({ hasText: name });
    }

    getProductName(name) {
        return this.getProduct(name).getByTestId('inventory-item-name');
    }

    getProductDescription(name) {
        return this.getProduct(name).getByTestId('inventory-item-desc');
    }

    getProductPrice(name) {
        return this.getProduct(name).getByTestId('inventory-item-price');
    }

    async getProductDetails(name) {
        return {
            name: await this.getProductName(name).textContent(),
            description: await this.getProductDescription(name).textContent(),
            price: await this.getProductPrice(name).textContent(),
        };
    }

    async addProductToCart(name) {
        const product = this.getProduct(name);
        await product.getByRole('button', { name: 'Add to cart' }).click();
    }

    async openProductDetails(name) {
        await this.getProduct(name).getByTestId(/-title-link$/).click();
    }

    async openCart() {
        await this.cartIcon.click();
    }
}