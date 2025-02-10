// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// support/commands.js

Cypress.Commands.add('login', (username, password) => {
    return cy.request({
        method: 'POST',
        url: '/api/login', // Replace with your actual login endpoint
        body: {
            username: username,
            password: password  
        },
        failOnStatusCode: false // Prevent Cypress from failing the test on non-2xx responses
    }).then((response) => {
        // Check for successful login
        expect(response.status).to.eq(200, 'Login request was not successful');

        // Validate that the token is present in the response
        if (response.body && response.body.token) {
            Cypress.env('API_TOKEN', response.body.token); // Store the token in an environment variable
        } else {
            throw new Error('Token not found in login response');
        }
    }).catch((error) => {
        // Log the error for better debugging
        cy.log('Login request failed:', error);
        throw new Error(`Login request failed: ${error.message}`);
    });
});
