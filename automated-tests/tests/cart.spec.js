import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryListingPage } from '../pages/InventoryListingPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { CartPage } from '../pages/CartPage';
import { users } from '../test-data/users';

test.describe('Shopping Cart', () => {
    let inventoryListingPage;

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(users.standard.username, users.standard.password);

        inventoryListingPage = new InventoryListingPage(page);
        await inventoryListingPage.expectReady();
    });

    test('TC-03: add a product to the cart and verify it is displayed in the cart', async ({ page }) => {
        const productName = 'Sauce Labs Backpack';
        const inventoryProductDetails = await inventoryListingPage.getProductDetails(productName);

        await inventoryListingPage.addProductToCart(productName);
        await expect(inventoryListingPage.getProduct(productName).getByRole('button', { name: 'Remove' })).toBeVisible();
        await expect(inventoryListingPage.cartBadge).toHaveText('1');
        await inventoryListingPage.openCart();

        const cartPage = new CartPage(page);
        await cartPage.expectReady();
        await expect(cartPage.getProduct(productName)).toBeVisible();

        const cartProductDetails = await cartPage.getProductDetails(productName);

        expect(cartProductDetails.name).toBe(inventoryProductDetails.name);
        expect(cartProductDetails.description).toBe(inventoryProductDetails.description);
        expect(cartProductDetails.price).toBe(inventoryProductDetails.price);
    });

    test('TC-05: cart contents remain correct during navigation', async ({ page }) => {
        const cartProductName = 'Sauce Labs Backpack';
        const navigationProductName = 'Sauce Labs Bike Light';

        await inventoryListingPage.addProductToCart(cartProductName);
        await inventoryListingPage.openCart();

        const cartPage = new CartPage(page);
        await cartPage.expectReady();
        await expect(cartPage.getProduct(cartProductName)).toBeVisible();
        
        await cartPage.continueShopping();
        await inventoryListingPage.expectReady();
        await inventoryListingPage.openProductDetails(navigationProductName);

        const productDetailsPage = new ProductDetailsPage(page);
        await productDetailsPage.expectReady();
        await productDetailsPage.backToProducts();
        await inventoryListingPage.expectReady();

        await expect(inventoryListingPage.cartBadge).toHaveText('1');
        await inventoryListingPage.openCart();
        await expect(cartPage.getProduct(cartProductName)).toBeVisible();
    });
});