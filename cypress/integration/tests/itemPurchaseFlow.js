import '../../support/index.js';

describe('Test Purchase and Checkout Flow', () => {
  it('Verify if you are able to successfully purchase', () => {
    cy.get('[data-test=add-to-cart-sauce-labs-backpack]').click();
    cy.get('[data-test=remove-sauce-labs-backpack]').should('be.visible');
    cy.get('.shopping_cart_badge').invoke('text').then((text) => {
      expect(text).to.equal('1');
    });

    const taxPercent = 8.00266756;

    cy.checkoutInformation();

    cy.get('.summary_subtotal_label').invoke('text').then((text) => {
      const amount = parseFloat(text.substring(13));
      expect(parseFloat(amount)).to.equal(parseFloat('29.99'));
      const taxAmount = (amount / 100) * taxPercent;
      cy.get('.summary_total_label').invoke('text').then((text) => {
        const totalAmount = text.substring(8);
        expect(totalAmount).to.equal(parseFloat(taxAmount + amount).toFixed(2));
      });
    });

    cy.get('[data-test=finish]').click();
    expect(cy.get('.complete-header').should('be.visible'));
  });
});
