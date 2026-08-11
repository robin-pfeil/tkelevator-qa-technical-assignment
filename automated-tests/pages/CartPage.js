import { expect } from '@playwright/test';
import { ProductItem } from '../components/ProductItem';

export class CartPage {

    constructor(page) {
        this.page = page;
        this.productList = page.getByTestId('cart-list');
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    }

    async goto() {
        await this.page.goto('/cart.html');
    }

    async expectReady() {
        await expect(this.productList).toBeVisible();
    }

    getProduct(productName) {
        return new ProductItem(this.productList, productName);
    }

    async checkout() {
        await this.checkoutButton.click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }
}