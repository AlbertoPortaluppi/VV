/// <reference types="cypress" />

describe('SauceDemo - Login e Navegação', () => {
  it('Login e Navegação', () => {
    cy.visit('https://www.saucedemo.com');

    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    cy.url().should('include', '/inventory.html');

    cy.get('#shopping_cart_container').click();
    cy.url().should('include', '/cart.html');

    cy.get('#react-burger-menu-btn').click();
    cy.get('#inventory_sidebar_link').click();
    cy.url().should('include', '/inventory.html');

    cy.get('#react-burger-menu-btn').click();
    cy.get('#about_sidebar_link').should('have.attr', 'href', 'https://saucelabs.com/');
    cy.get('#react-burger-cross-btn').click();

    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').click();
    cy.url().should('include', '/');
  });
});