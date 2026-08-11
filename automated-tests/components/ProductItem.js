export class ProductItem {
    constructor(productLocator) {
        this.root = productLocator;
        this.name = this.root.getByTestId('inventory-item-name');
        this.description = this.root.getByTestId('inventory-item-desc');
        this.price = this.root.getByTestId('inventory-item-price');
    }

    async getProductDetails() {
        return {
            name: await this.name.textContent(),
            description: await this.description.textContent(),
            price: await this.price.textContent(),
        };
    }
}