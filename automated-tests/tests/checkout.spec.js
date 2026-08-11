import { test, expect } from '../fixtures/testFixtures';
import { CartPage } from '../pages/CartPage';
import { CheckoutInformationPage } from '../pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

test.describe('Checkout Process', () => {
    test('TC-06: user can complete checkout process @smoke @regression', async ({ page, authenticatedInventoryPage }) => {
        const inventoryListingPage = authenticatedInventoryPage;

        const productName = 'Sauce Labs Backpack';

        const firstName = 'John';
        const lastName = 'Doe';
        const postalCode = '10115';

        const inventoryProduct = inventoryListingPage.getProduct(productName);
        const inventoryProductDetails = await inventoryProduct.getProductDetails();

        await inventoryListingPage.addProductToCart(productName);
        await inventoryListingPage.openCart();

        const cartPage = new CartPage(page);
        await cartPage.expectReady();
        await expect(cartPage.getProduct(productName).root).toBeVisible();
        await cartPage.checkout();

        const checkoutInformationPage = new CheckoutInformationPage(page);
        await checkoutInformationPage.expectReady();
        await checkoutInformationPage.fillCheckoutInformation(firstName, lastName, postalCode);
        await checkoutInformationPage.continueCheckout();

        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        await checkoutOverviewPage.expectReady();

        const checkoutProduct = checkoutOverviewPage.getProduct(productName);
        const checkoutProductDetails = await checkoutProduct.getProductDetails();

        expect(checkoutProductDetails).toEqual(inventoryProductDetails);

        const productPrice = parseFloat(checkoutProductDetails.price.replace('$', ''));
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
        test(`TC-07: validates required ${scenario.field} @regression`, async ({ page, authenticatedInventoryPage }) => {
            const inventoryListingPage = authenticatedInventoryPage;
            const productName = 'Sauce Labs Backpack';
            
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