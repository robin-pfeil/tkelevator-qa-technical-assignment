import { expect } from '@playwright/test';

export class CheckoutCompletePage {
    
    constructor(page) {
        this.page = page;
        this.completeHeader = page.getByTestId('secondary-header');
        this.successHeading = page.getByText('Thank you for your order!');
        this.dispatchMessage = page.getByText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
        this.backHomeButton = page.getByRole('button', { name: 'Back Home' });
        this.generatePdfOrderButton = page.getByRole('button', { name: 'Generate PDF Order' });
    }

    async expectReady() {
        await expect(this.completeHeader).toContainText('Checkout: Complete!');
    }
}