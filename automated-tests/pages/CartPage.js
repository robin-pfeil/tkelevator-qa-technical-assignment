import { expect } from '@playwright/test';

export class CartPage {

    constructor(page) {
        this.page = page;
        this.cartList = page.getByTestId('cart-list');
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    }

    async goto() {
        await this.page.goto('/cart.html');
    }

    async expectReady() {
        await expect(this.cartList).toBeVisible();
    }

    getProduct(name) {
        return this.cartList.getByTestId('inventory-item').filter({ hasText: name });
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

    async continueShopping() {
        await this.continueShoppingButton.click();
    }
}