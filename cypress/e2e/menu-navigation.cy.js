/// <reference types="cypress" />

describe('test user menu navigation', () => {
  beforeEach(() => {
    const userMock = {
      country: "Brazil",
      email: "user1@teste.com",
      password: "teste1"
    }

    cy.window().then((win) => {
      win.localStorage.setItem('Netflix_user', JSON.stringify(userMock));
    })

    cy.visit('http://localhost:4200');
  })

  it('Navigate to menu Metrics', () => {

    cy.get('a[href="/metrics"').click();
    cy.url().should('be.equal', 'http://localhost:4200/metrics');
    cy.get('.metrics-banner_wrapper').should('be.visible');
  });

  it('Navigate to menu Home', () => {

    cy.get('a[href="/"').click();
    cy.url().should('be.equal', 'http://localhost:4200/');
  });

  it('Navigate to menu profile', () => {

    cy.get('a[href="/profile"').click();
    cy.url().should('be.equal', 'http://localhost:4200/profile');
    cy.get('.profile').should('be.visible');
  });

});
