import { expect } from '@playwright/test';

export class CheckoutOverviewPage {
    constructor(page) {
        this.page = page;
        this.cartList = page.getByTestId('cart-list');
        this.itemTotalField = page.getByTestId('subtotal-label');
        this.taxField = page.getByTestId('tax-label');
        this.totalField = page.getByTestId('total-label');
        this.finishButton = page.getByRole('button', { name: 'Finish' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
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

    async getItemTotalValue() {
        const text = await this.itemTotalField.textContent();
        return parseFloat(text.replace('Item total: $', ''));
    }

    async getTaxValue() {
        const text = await this.taxField.textContent();
        return parseFloat(text.replace('Tax: $', ''));
    }

    async getTotalValue() {
        const text = await this.totalField.textContent();
        return parseFloat(text.replace('Total: $', ''));
    }

    async getProductDetails(name) {
        return {
            name: await this.getProductName(name).textContent(),
            description: await this.getProductDescription(name).textContent(),
            price: await this.getProductPrice(name).textContent(),
        };
    }

    async finishCheckout() {
        await this.finishButton.click();
    }

    async cancelCheckout() {
        await this.cancelButton.click();
    }
}