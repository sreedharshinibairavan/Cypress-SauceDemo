/// <reference types="Cypress" />
import '../../support/index.js';

describe('Test Purchase and Checkout Flow', () => {
  
  it('Verify purchase', () => {

    cy.get('[data-test=add-to-cart-sauce-labs-backpack]').click();
    cy.get('[data-test=remove-sauce-labs-backpack]').should('be.visible');
    cy.get('.shopping_cart_badge').invoke('text').then((text) => {
      expect(text).to.equal('1')
    });

    let taxPercent = 8.00266756

    cy.CheckoutInformation();

    cy.get('.summary_subtotal_label').invoke('text').then((text) => {
      let text1 = parseFloat(text.substring(13));
      expect(parseFloat(text1)).to.equal(parseFloat("29.99"))
      let taxAmount = (text1 / 100) * taxPercent;
      cy.get('.summary_total_label').invoke('text').then((text) => {
        let text2 = text.substring(8)
        expect(text2).to.equal(parseFloat(taxAmount + text1).toFixed(2))
      });
    });

    cy.get('[data-test=finish]').click()
    expect(cy.get('.complete-header').should('be.visible'))

  });
});
