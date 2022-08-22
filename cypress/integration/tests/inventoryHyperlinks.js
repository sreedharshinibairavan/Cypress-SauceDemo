import '../../support/index.js';

describe('Test all the URLs in the webpage', () => {
  it('Verify if any of the links are broken within the webpage', () => {
    cy.on('window:confirm', cy.stub().as('confirm'));
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });

    cy.wrap('passed').as('ctrl');
    cy.get('a:not([href*=\'mailto:]\']').each(($el) => {
      if ($el.prop('href').length > 0) {
        const status = $el.text();
        expect($el, status).to.have.attr('href').not.contain('undefined');
        cy.log($el.attr('href'));
      }
    });
  });
});
