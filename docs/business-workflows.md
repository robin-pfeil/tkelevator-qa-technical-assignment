# Business Workflows

SauceDemo is a sample e-commerce web application that allows users to authenticate, browse and inspect products, manage a shopping cart, and complete an order through a checkout process.

After exploring the application, the workflows below were identified as the most important because they represent the main actions a user needs to perform to successfully complete the application's primary shopping journey.

## Primary End-to-End User Journey

The application's main user journey can be summarized as:

**Login → Browse products → View/select product → Add to cart → Review cart → Checkout → Confirm order → Logout**

The individual business workflows that support this journey are described below.

## Authentication & Session Management

* Log in with an authorized user
* Prevent login for unauthorized or locked-out users
* Log out of the application
* Ensure authenticated pages are appropriately protected

## Product Browsing & Discovery

* View the inventory/product list
* View product name, image, description, and price
* Sort products
* Open an individual product's detail page
* Return from product details to the product list

## Shopping Cart Management

* Add products to the cart
* Add multiple products to the cart
* Remove products from the cart
* View selected products in the cart
* Verify that the cart reflects the user's selections
* Continue shopping after visiting the cart

## Checkout & Order Completion

* Start checkout from the shopping cart
* Enter customer information
* Continue to the checkout overview
* Review selected items and pricing
* Complete the order
* Receive an order confirmation
* Return to the inventory after completing the order

## Application Navigation

* Navigate to All Items through the application menu
* Navigate to the Shopping Cart
* Navigate to the About page
* Return to shopping using the available navigation options
* Navigate correctly when cancelling checkout
* Log out through the application menu