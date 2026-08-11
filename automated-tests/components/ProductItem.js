export class ProductItem {
    constructor(productList, productName) {
        this.root = productList.getByTestId('inventory-item').filter({ hasText: productName });
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