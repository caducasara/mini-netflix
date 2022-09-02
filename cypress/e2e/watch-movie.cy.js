/// <reference types="cypress" />

describe('Watch movie', () => {
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

  it('select movie to watch in to home page', () => {

    cy.get('.card-container').contains('Peaky Blinders: Blood, Bets and Razors')
      .invoke('show');
    cy.get('.play-movie:contains(Peaky Blinders: Blood, Bets and Razors) button')
      .click({ force: true });
    cy.get('.movie-title').contains('Peaky Blinders: Blood, Bets and Razors')
      .should('be.visible');
  });

  it('select movie to watch in to metrics page', () => {

    cy.visit('http://localhost:4200/metrics');
    cy.get('.card-container').contains('The Beast of the Sea')
      .invoke('show');
    cy.get('.play-movie:contains(The Beast of the Sea) button').first()
      .click({ force: true });
    cy.get('.movie-title').contains('The Beast of the Sea')
      .should('be.visible');
  });

});
