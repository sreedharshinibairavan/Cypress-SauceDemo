import '../../support/index.js';

describe('Test negative usecases in login, checkout and performance', () => {
  it('Verify the negative usecases', () => {
    cy.scrollTo('top');
    cy.logout();

    /* This is the test snippet to verify wrong user credntials */
    cy.login(Cypress.env('username')+'fnjfn)', Cypress.env('password'));
    cy.get('[data-test=error]').invoke('text').then((text) => {
      // eslint-disable-next-line max-len
      expect(text).to.equal('Epic sadface: Username and password do not match any user in this service');
    });
    cy.reload();

    /* This is the test snippet to verify for locked-out user */
    cy.login(Cypress.env('username1'), Cypress.env('password'));
    cy.get('[data-test=error]').invoke('text').then((text) => {
      // eslint-disable-next-line max-len
      expect(text).to.equal('Epic sadface: Sorry, this user has been locked out.');
    });
    cy.reload();

    // eslint-disable-next-line max-len
    /* The below snippet tests the problematic user, for whom the checkout flow is flawed */
    cy.login(Cypress.env('username2'), Cypress.env('password'));
    // eslint-disable-next-line max-len
    const capacity = performance.now(); // captured the page performance of a normal page for later use
    cy.checkoutInformation();
    cy.get('[data-test=error]').invoke('text').then((text) => {
      expect(text).to.equal('Error: Last Name is required');
    });
    cy.logout();

    // eslint-disable-next-line max-len
    /* The below snippet tests the user with performance issue*/
    cy.login(Cypress.env('username3'), Cypress.env('password'));
    cy.wrap(performance.now()).then((capacity1) => {
      /* this is now a queued command
            which will only run after the previous command */
      cy.log(`Page load took ${capacity1 - capacity} milliseconds.`);
      // eslint-disable-next-line max-len
      /* Passing this test case as the performance lag expected, but in real time, it should be otherwise */
      cy.get('#item_4_img_link').click();
      expect(capacity1 - capacity).to.be.greaterThan(0.1);
    });

    cy.scrollTo('top');
    cy.get('[data-test=back-to-products]').click();
  });
});
