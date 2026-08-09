import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryListingPage } from '../pages/InventoryListingPage';
import { CartPage } from '../pages/CartPage';
import { users } from '../test-data/users';

test('TC-03: add a product to the cart and verify it is displayed in the cart', async ({ page }) => {
    const productName = 'Sauce Labs Backpack';
    
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

    const inventoryListingPage = new InventoryListingPage(page);
    await inventoryListingPage.expectReady();

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