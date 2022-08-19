/// <reference types="Cypress" />
import '../../support/index.js';

describe('Test scenarios around product', () => {
    
    it('Test product sorting', () => {
        var optionsArray = []
        var newar = []

        cy.get('[data-test=product_sort_container]').select('Price (low to high)')

        cy.get('.inventory_item_price').each(($el, index) => {
            optionsArray[index] = $el.text()
            newar[index] = parseFloat($el.text().substring(1));
        })
            .then(() => {
                console.log("actual array = " + newar)
                console.log("sorted array = " + newar.sort(function (a, b) { return a - b; }))
                expect(newar).to.deep.equal(newar.sort(function (a, b) { return a - b; }))
            });
    });

    it('verify product page', () => {
        cy.get('#item_4_img_link').click()
        expect(cy.url().should('include', 'inventory-item'))
        cy.get('[data-test=back-to-products]').click()
        cy.wait(3000);
    });

    it('verify back to products', () => {
        
        cy.log(Cypress.config().baseURL + 'inventory.html')
        cy.url()

        const landingURL = (Cypress.config().baseURL).toString()

        let currentURL
        cy.url().then(url => {
            currentURL = url
        });
        cy.then(() => cy.log("this is current url" + currentURL))

        cy.log("this is base url" + landingURL)
        cy.then(() => expect(landingURL + 'inventory.html').to.equal((currentURL)))
    });

    it('verify remove from cart', () => {
        cy.get('[data-test=add-to-cart-sauce-labs-backpack]').click();
        cy.get('[data-test=remove-sauce-labs-backpack]').click();
        cy.get('[data-test=add-to-cart-sauce-labs-backpack]').should('be.visible')
    });
});
