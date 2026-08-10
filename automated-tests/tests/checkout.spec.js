import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryListingPage } from '../pages/InventoryListingPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInformationPage } from '../pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { users } from '../test-data/users';

test.describe('Checkout Process', () => {
    let inventoryListingPage;
    const productName = 'Sauce Labs Backpack';

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(users.standard.username, users.standard.password);

        inventoryListingPage = new InventoryListingPage(page);
        await inventoryListingPage.expectReady();
    });

    test('TC-06: user can complete checkout process', async ({ page }) => {
        const firstName = 'John';
        const lastName = 'Doe';
        const postalCode = '10115';
        const inventoryProductDetails = await inventoryListingPage.getProductDetails(productName);

        await inventoryListingPage.addProductToCart(productName);
        await inventoryListingPage.openCart();

        const cartPage = new CartPage(page);
        await cartPage.expectReady();
        await expect(cartPage.getProduct(productName)).toBeVisible();
        await cartPage.checkout();

        const checkoutInformationPage = new CheckoutInformationPage(page);
        await checkoutInformationPage.expectReady();
        await checkoutInformationPage.fillCheckoutInformation(firstName, lastName, postalCode);
        await checkoutInformationPage.continueCheckout();

        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        await checkoutOverviewPage.expectReady();

        const checkoutProductDetails = await checkoutOverviewPage.getProductDetails(productName);

        expect(checkoutProductDetails.name).toBe(inventoryProductDetails.name);
        expect(checkoutProductDetails.description).toBe(inventoryProductDetails.description);
        expect(checkoutProductDetails.price).toBe(inventoryProductDetails.price);

        const productPrice = parseFloat(inventoryProductDetails.price.replace('$', ''));
        const itemTotal = await checkoutOverviewPage.getItemTotalValue();
        const tax = await checkoutOverviewPage.getTaxValue();
        const total = await checkoutOverviewPage.getTotalValue();

        expect(itemTotal).toBe(productPrice);
        expect(tax).toBeCloseTo(itemTotal * 0.08, 2);
        expect(total).toBeCloseTo(itemTotal + tax, 2);

        await checkoutOverviewPage.finishCheckout();

        const checkoutCompletePage = new CheckoutCompletePage(page);
        await checkoutCompletePage.expectReady();
        await expect(checkoutCompletePage.successHeading).toBeVisible();
        await expect(checkoutCompletePage.dispatchMessage).toBeVisible();
        await expect(checkoutCompletePage.backHomeButton).toBeVisible();
        await expect(checkoutCompletePage.generatePdfOrderButton).toBeVisible();
    });

    const checkoutValidationScenarios = [
        {
            field: 'first name',
            firstName: '',
            lastName: 'Doe',
            postalCode: '10115',
            expectedError: 'Error: First Name is required',
        },
        {
            field: 'last name',
            firstName: 'John',
            lastName: '',
            postalCode: '10115',
            expectedError: 'Error: Last Name is required',
        },
        {
            field: 'postal code',
            firstName: 'John',
            lastName: 'Doe',
            postalCode: '',
            expectedError: 'Error: Postal Code is required',
        },
    ];

    for (const scenario of checkoutValidationScenarios) {
        test(`TC-07: validates required ${scenario.field}`, async ({ page }) => {
            await inventoryListingPage.addProductToCart(productName);
            await inventoryListingPage.openCart();

            const cartPage = new CartPage(page);
            await cartPage.expectReady();
            await cartPage.checkout();

            const checkoutInformationPage = new CheckoutInformationPage(page);
            await checkoutInformationPage.expectReady();

            await checkoutInformationPage.fillCheckoutInformation(scenario.firstName, scenario.lastName, scenario.postalCode);
            await checkoutInformationPage.continueCheckout();

            await expect(page).toHaveURL('/checkout-step-one.html');
            await expect(checkoutInformationPage.errorMessage).toHaveText(scenario.expectedError);
        });
    }
});