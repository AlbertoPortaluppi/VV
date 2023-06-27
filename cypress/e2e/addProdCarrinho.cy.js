/// <reference types="cypress" />

describe('SauceDemo-Add de Produtos ao Carrinho', () => {
  it('Add de Produtos ao Carrinho', () => {
    cy.visit('https://www.saucedemo.com');

    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    cy.url().should('include', '/inventory.html');

    cy.get('#add-to-cart-sauce-labs-backpack').click();

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

    cy.get('#remove-sauce-labs-backpack').click();

    cy.go('back');
    cy.url().should('include', '/inventory.html');

    cy.get('#add-to-cart-sauce-labs-backpack').click();
    cy.get('#add-to-cart-sauce-labs-bike-light').click();
    cy.get('#add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)').click();

    cy.get('.shopping_cart_badge').should('contain', '3');

    cy.get('#shopping_cart_container').click();
    cy.url().should('include', '/cart.html');

    cy.get('.inventory_item_name').should('have.length', 3);

    cy.get('#remove-sauce-labs-backpack').click();
    cy.get('#remove-sauce-labs-bike-light').click();
    cy.get('#remove-test\\.allthethings\\(\\)-t-shirt-\\(red\\)').click();

    cy.go('back');
    cy.url().should('include', '/inventory.html');

    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').click();
    cy.url().should('include', '/');
  });
});