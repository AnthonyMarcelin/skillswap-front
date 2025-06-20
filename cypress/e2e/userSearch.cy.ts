/// <reference types="cypress" />

cy.visit('/search');  // ta page de recherche

cy.get('input[name=skill]').type('cuisine');
cy.get('input[name=zipcode]').type('75001');
cy.get('button[type=submit]').click();

cy.get('.user-card').should('have.length.greaterThan', 0);
cy.get('.user-card').first().should('contain.text', 'cuisine');