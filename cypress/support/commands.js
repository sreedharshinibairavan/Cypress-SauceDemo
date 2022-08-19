import './index.js';

/* Before All */
before(function () {

    /**
     * added this step to avoid before running twice (Hack for an existing cypress issue where the before runs twice)
     */
    if (Cypress.config('firstRun')) {
        cy.visit(Cypress.config().baseURL);
        cy.Login(Cypress.env('username'), Cypress.env('password'));
        /**
         * If needed can add(err, runnable)
         */
        Cypress.on('uncaught:exception', () => {
            /**
             * returning false here prevents Cypress from failing the test if there are any exceptions from 3rd party scripts
             */
            return false;
        });
        Cypress.config('firstRun', false);
    }
});

beforeEach(function () {

    /* Preserve Cookies and Session */
    Cypress.Cookies.debug(true)
    Cypress.Cookies.preserveOnce('session-username')

})

/* Login Command */
Cypress.Commands.add('Login', (username, password) => {

    /* Enter credentials */
    cy.get('[data-test=username]').type(username);
    cy.get('[data-test=password]').type(password);

    /* Click submit */
    cy.get('[data-test=login-button]').click();
});

/* Logout Command */
Cypress.Commands.add('Logout', () => {
    
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').click();
});

/* User information for checkout */
Cypress.Commands.add('CheckoutInformation', () => {

    const firstName = cy.faker.name.firstName();
    const lastName = cy.faker.name.lastName();
    const zipCode = cy.faker.address.zipCode();
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test=checkout]').click();
    cy.get('[data-test=firstName]').type(firstName)
    cy.get('[data-test=lastName]').type(lastName)
    cy.get('[data-test=postalCode]').type(zipCode)
    cy.get('[data-test=continue]').click()
});

after(function () {

    Cypress.config('firstRun', true);
});
