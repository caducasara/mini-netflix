/// <reference types="cypress" />


describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  })

  it('displays two todo items by default', () => {

    cy.get('input[name="email"').type('user1@teste.com');
    cy.get('input[name="password"').type('teste1');
    cy.get('button[type="submit"]').click();

    // cy.get('.todo-list li').first().should('have.text', 'Pay electric bill')
    // cy.get('.todo-list li').last().should('have.text', 'Walk the dog')
  })
})
