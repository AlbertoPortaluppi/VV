/// <reference types="cypress" />

describe('SauceDemo', () => {
  it('Finalização da Compra', () => {
    cy.visit('https://www.saucedemo.com');

    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    cy.url().should('include', '/inventory.html');

    cy.get('#add-to-cart-sauce-labs-bolt-t-shirt').click();

    cy.get('.shopping_cart_badge').should('contain', '1');

    cy.get('.inventory_item_name').first().invoke('text').as('ItemName');
    cy.get('.inventory_item_desc').first().invoke('text').as('ItemDesc');
    cy.get('.inventory_item_price').first().invoke('text').as('ItemPrice');

    cy.get('#shopping_cart_container').click();
    cy.url().should('include', '/cart.html');

    cy.get('@ItemName').then((ItemName) => {
      cy.get('.inventory_item_name').contains(ItemName);
    });
    cy.get('@ItemDesc').then((ItemDesc) => {
      cy.get('.inventory_item_desc').contains(ItemDesc);
    });
    cy.get('@ItemPrice').then((ItemPrice) => {
      cy.get('.inventory_item_price').contains(ItemPrice);
    });
    cy.get('.cart_quantity').should('contain', '1');

    cy.get('#checkout').click();
    cy.url().should('include', '/checkout-step-one.html');

    cy.get('#first-name').type('Betinho');
    cy.get('#last-name').type('UTFPR');
    cy.get('#postal-code').type('85660-000');

    cy.get('#continue').click();
    cy.url().should('include', '/checkout-step-two.html');

    cy.get('@ItemName').then((ItemName) => {
      cy.get('.inventory_item_name').contains(ItemName);
    });
    cy.get('@ItemDesc').then((ItemDesc) => {
      cy.get('.inventory_item_desc').contains(ItemDesc);
    });
    cy.get('@ItemPrice').then((ItemPrice) => {
      cy.get('.inventory_item_price').contains(ItemPrice);
    });

    cy.get('.summary_subtotal_label').contains('Item total: $15.99');
    cy.get('.summary_tax_label').contains('Tax: $1.28');
    cy.get('.summary_info_label.summary_total_label').contains('Total: $17.27');

    cy.get('#finish').click();
    cy.url().should('include', '/checkout-complete.html');

    cy.get('.complete-header').contains('Thank you for your order!');
    cy.get('.complete-text').contains('Your order has been dispatched, and will arrive just as fast as the pony can get there!');

    cy.get('#back-to-products').click();
    cy.url().should('include', '/inventory.html');

    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').click();
    cy.url().should('include', '/');
  });
});