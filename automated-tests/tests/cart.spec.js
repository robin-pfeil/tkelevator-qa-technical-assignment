import { test, expect } from '../fixtures/testFixtures';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { CartPage } from '../pages/CartPage';

test.describe('Shopping Cart', () => {
    test('TC-03: add a product to the cart and verify it is displayed in the cart @smoke @regression', async ({ page, authenticatedInventoryPage }) => {
        const productName = 'Sauce Labs Backpack';
        const inventoryListingPage = authenticatedInventoryPage;

        const inventoryProduct = inventoryListingPage.getProduct(productName);
        const inventoryProductDetails = await inventoryProduct.getProductDetails();

        await inventoryListingPage.addProductToCart(productName);
        await expect(inventoryProduct.root.getByRole('button', { name: 'Remove' })).toBeVisible();
        await expect(inventoryListingPage.cartBadge).toHaveText('1');
        await inventoryListingPage.openCart();

        const cartPage = new CartPage(page);
        await cartPage.expectReady();

        const cartProduct = cartPage.getProduct(productName);
        await expect(cartProduct.root).toBeVisible();
        const cartProductDetails = await cartProduct.getProductDetails();

        expect(cartProductDetails).toEqual(inventoryProductDetails);
    });

    test('TC-05: cart contents remain correct during navigation @regression', async ({ page, authenticatedInventoryPage }) => {
        const productName = 'Sauce Labs Backpack';
        const navigationProductName = 'Sauce Labs Bike Light';

        const inventoryListingPage = authenticatedInventoryPage;

        await inventoryListingPage.addProductToCart(productName);
        await inventoryListingPage.openCart();

        const cartPage = new CartPage(page);
        await cartPage.expectReady();
        await expect(cartPage.getProduct(productName).root).toBeVisible();
        
        await cartPage.continueShopping();
        await inventoryListingPage.expectReady();
        await inventoryListingPage.openProductDetails(navigationProductName);

        const productDetailsPage = new ProductDetailsPage(page);
        await productDetailsPage.expectReady();
        await productDetailsPage.backToProducts();

        await inventoryListingPage.expectReady();
        await expect(inventoryListingPage.cartBadge).toHaveText('1');
        await inventoryListingPage.openCart();

        await cartPage.expectReady();
        await expect(cartPage.getProduct(productName).root).toBeVisible();
    });
});