// / <reference types="Cypress" />
import '../../support/index.js';

describe('Test negative usecases in login, checkout and performance', () => {
  it('Verify negative usecases', () => {
    cy.logout();
    cy.login(Cypress.env('username1'), Cypress.env('password'));
    cy.get('[data-test=error]').invoke('text').then((text) => {
      // eslint-disable-next-line max-len
      expect(text).to.equal('Epic sadface: Sorry, this user has been locked out.');
    });
    cy.reload();

    cy.login(Cypress.env('username2'), Cypress.env('password'));
    const t0 = performance.now();
    cy.checkoutInformation();
    cy.get('[data-test=error]').invoke('text').then((text) => {
      expect(text).to.equal('Error: Last Name is required');
    });

    cy.logout();

    cy.login(Cypress.env('username3'), Cypress.env('password'));

    cy.log('Home page load time--' + t0);
    cy.get('#item_4_img_link').click();
    cy.wrap(performance.now()).then((t1) => {
      /* this is now a queued command
            which will only run after the previous command */
      cy.log(`Page load took ${t1 - t0} milliseconds.`);
      expect(t1 - t0).to.be.greaterThan(0.1);
    });
    cy.scrollTo('top');
    cy.get('[data-test=back-to-products]').click();
  });
});
