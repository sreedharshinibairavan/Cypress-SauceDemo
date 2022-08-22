/* eslint-disable cypress/no-unnecessary-waiting */
import '../../support/index.js';

describe('Test scenarios around products', () => {
  /* chose sort type of low to high price and automated it */
  it('Verify product sorting', () => {
    const selectArray = [];
    const newArray = [];
    const sortedArray = [];

    cy.get('[data-test=product_sort_container]').select('Price (low to high)');
    cy.get('.inventory_item_price').each(($el, index) => {
      selectArray[index] = $el.text();
      newArray[index] = parseFloat($el.text().substring(1));
      sortedArray[index] = newArray.sort(function(a, b) {
        return a - b;
      });
      expect(newArray).to.deep.eq(sortedArray[index]);
    });
  });

  it('Verify product details page', () => {
    /* made sure product details page loads as expected */
    cy.get('#item_4_img_link').click();
    expect(cy.url().should('include', 'inventory-item'));
    cy.get('[data-test=back-to-products]').click();
    cy.wait(3000);
    // eslint-disable-next-line max-len
    // best use is assertions with {timeout} but sometimes in continous testing in the same page requires cy.wait to comlete certain tasks
  });

  it('Verify back to products(invertory)', () => {
    /* back to inventory case */
    cy.url();
    const landingURL = (Cypress.config().baseURL).toString();

    let currentURL;
    cy.url().then((url) => {
      currentURL = url;
    });

    cy.then(() => expect(landingURL + 'inventory.html').to.equal((currentURL)));
  });

  it('Verify remove from cart', () => {
    /* adding an item and removing it from the cart */
    cy.get('[data-test=add-to-cart-sauce-labs-backpack]').click();
    cy.get('[data-test=remove-sauce-labs-backpack]').click();
    cy.get('[data-test=add-to-cart-sauce-labs-backpack]').should('be.visible');
  });
});
