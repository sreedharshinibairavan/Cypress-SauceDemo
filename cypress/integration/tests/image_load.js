import '../../support/index.js';

describe('Test if all images in the inventory are loaded fine', () => {
  it('Image load', () => {
    cy.get('a>img.inventory_item_img')
        .should('be.visible')
        .and('have.prop', 'naturalWidth')
        .should('be.greaterThan', 0);
  });
});
