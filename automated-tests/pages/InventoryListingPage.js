import { expect } from '@playwright/test';
import { ProductItem } from '../components/ProductItem';

export class InventoryListingPage {

    constructor(page) {
        this.page = page;
        this.productList = page.getByTestId('inventory-list');
        this.cartIcon = page.getByTestId('shopping-cart-link');
        this.cartBadge = this.cartIcon.getByTestId('shopping-cart-badge');
    }

    async goto() {
        await this.page.goto('/inventory.html');
    }

    async expectReady() {
        await expect(this.productList).toBeVisible();
    }

    getProduct(productName) {
        return new ProductItem(this.productList, productName);
    }

    async addProductToCart(productName) {
        const product = this.getProduct(productName);
        await product.root.getByRole('button', { name: 'Add to cart' }).click();
    }

    async openProductDetails(productName) {
        const product = this.getProduct(productName);
        await product.root.getByTestId(/-title-link$/).click();
    }

    async openCart() {
        await this.cartIcon.click();
    }
}