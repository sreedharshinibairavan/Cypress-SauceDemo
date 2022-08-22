import '../../support/index.js';

describe('Test if all images in the inventory are loading fine', () => {
  it('Verify if all the images in the inventory page loads as expected', () => {
    /* made sure image loads in the expected dimension */
    cy.get('a>img.inventory_item_img')
        .should('be.visible')
        .and('have.prop', 'naturalWidth')
        .should('be.greaterThan', 0);
  });
});
