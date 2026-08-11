import { expect } from '@playwright/test';
import { ProductItem } from '../components/ProductItem';

export class CheckoutOverviewPage {
    constructor(page) {
        this.page = page;
        this.productList = page.getByTestId('cart-list');
        this.itemTotalField = page.getByTestId('subtotal-label');
        this.taxField = page.getByTestId('tax-label');
        this.totalField = page.getByTestId('total-label');
        this.finishButton = page.getByRole('button', { name: 'Finish' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    }

    async expectReady() {
        await expect(this.productList).toBeVisible();
    }

    getProduct(productName) {
        return new ProductItem(this.productList.getByTestId('inventory-item').filter({ hasText: productName }));
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

    async getProductDetails(productName) {
        return {
            name: await this.getProductName(productName).textContent(),
            description: await this.getProductDescription(productName).textContent(),
            price: await this.getProductPrice(productName).textContent(),
        };
    }

    async finishCheckout() {
        await this.finishButton.click();
    }

    async cancelCheckout() {
        await this.cancelButton.click();
    }
}