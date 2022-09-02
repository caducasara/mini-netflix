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

    cy.visit('http://localhost:4200/profile');
  })

  it('User logout correctly', () => {

    cy.get('.logout').click();
    cy.url().should('be.equal', 'http://localhost:4200/signin');
  });

});
