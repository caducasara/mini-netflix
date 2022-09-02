/// <reference types="cypress" />


describe('example login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  })

  it('Redirect user to home page when user entry with correct credentials', () => {

    cy.get('input[name="email"').type('user1@teste.com');
    cy.get('input[name="password"').type('teste1');
    cy.get('button[type="submit"]').click();

    cy.url().should('be.equal', 'http://localhost:4200/')
  });

  it('Exib input Validations when user entry with incorrect values', () => {

    cy.get('input[name="email"').type('user1teste.com');
    cy.get('body').click();
    cy.get('.email-incorrect').should('be.visible');

    cy.get('input[name="password"').type('te1');
    cy.get('body').click();
    cy.get('.inocrrect-password').should('be.visible');

  });

  it('Exib warning user incorrect credentials', () => {

    cy.get('input[name="email"').type('user1@teste.com');
    cy.get('input[name="password"').type('teste2');
    cy.get('button[type="submit"]').click();

    cy.get('.incorrect-user-credential').should('be.visible');

  })
});
