import { createResource } from '../../support/api-helpers.js';
import { generateUserData } from '../../support/data-factory.js';

describe('Forgot Password API Tests', () => {
    let validUserData;

    // Load valid user data from the fixture file
    cy.fixture("akoni-users").then((user) => {
        validUserData = user; // Assume this contains { username: 'validUser', password: 'validPassword' }
    });

    const invalidUserData = {
        email: 'invalidemail.com', // Invalid email format
    };

    it('should successfully send a forgot password request for a valid user', () => {
        createResource('forgotpassword', validUserData)
            .then((response) => {
                expect(response.status).to.eq(200); // Assuming the success response status is 200
                expect(response.body.message).to.include('Password reset link sent'); // Update based on actual response
            })
            .catch((error) => {
                cy.log('Error in forgot password request:', error);
                throw new Error('Request failed');
            });
    });

    it('should return an error for a non-existent user', () => {
        const nonExistentUser = { email: 'nonexistent@example.com' };

        createResource('forgotpassword', nonExistentUser)
            .then((response) => {
                expect(response.status).to.eq(404); // Expecting a 404 Not Found
                expect(response.body.message).to.include('User not found');
            })
            .catch((error) => {
                cy.log('Error in forgot password request:', error);
                throw new Error('Request failed');
            });
    });

    it('should return an error for invalid email format', () => {
        createResource('forgotpassword', invalidUserData)
            .then((response) => {
                expect(response.status).to.eq(400); // Expecting a 400 Bad Request
                expect(response.body.message).to.include('Invalid email format');
            })
            .catch((error) => {
                cy.log('Error in forgot password request:', error);
                throw new Error('Request failed');
            });
    });

    it('should return an error when email is missing', () => {
        const missingEmailData = {};

        createResource('forgotpassword', missingEmailData)
            .then((response) => {
                expect(response.status).to.eq(400); // Expecting a 400 Bad Request
                expect(response.body.message).to.include('Email is required');
            })
            .catch((error) => {
                cy.log('Error in forgot password request:', error);
                throw new Error('Request failed');
            });
    });

    it('should return an error for rate limiting', () => {
        
        // Simulate multiple requests to trigger rate limiting
        const promises = Array.from({ length: 6 }, () => createResource('forgotpassword', validUserData));

        cy.wrap(Promise.all(promises)).then((responses) => {
            responses.forEach((response, index) => {
                if (index < 5) {
                    expect(response.status).to.eq(200); // First 5 should succeed
                } else {
                    expect(response.status).to.eq(429); // 6th request should hit rate limit
                    expect(response.body.message).to.include('Too many requests');
                }
            });
        }).catch((error) => {
            cy.log('Error in forgot password request:', error);
            throw new Error('Request failed');
        });
    });
});
