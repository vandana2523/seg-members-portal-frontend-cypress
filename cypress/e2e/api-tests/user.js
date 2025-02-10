import { getResource, createResource, updateResource, deleteResource } from '../../support/api-helpers.js';
import { generateUserData, generateUpdatedUserData } from '../../support/data-factory.js';

describe('User API Tests', () => {
    let userId;
    const userData = generateUserData();
    const updatedUserData = generateUpdatedUserData();

    before(() => {
        cy.login(); // Ensure you're logged in before tests
        cy.fixture("akoni-users").then((user) => {
            cy.login(user.username, user.password);
        });
    });

    it('should create a user with dynamic data', () => {
        createResource('users', userData).then((response) => {
            expect(response.status).to.eq(201);
            userId = response.body.id; // Store user ID
        }).catch((error) => {
            cy.log('Error creating user:', error);
            throw new Error('User creation failed');
        });
    });

    it('should fetch user details', () => {
        getResource('users', userId).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('name', userData.name);
            expect(response.body).to.have.property('email', userData.email);
        }).catch((error) => {
            cy.log('Error fetching user details:', error);
            throw new Error('Failed to fetch user details');
        });
    });

    it('should fetch a static user', () => {
        cy.fixture('static-user-data').then((data) => {
            const staticUser = data.users[0];
            return getResource('users', staticUser.id).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('name', staticUser.name);
            });
        }).catch((error) => {
            cy.log('Error fetching static user:', error);
            throw new Error('Failed to fetch static user');
        });
    });

    it('should update user details', () => {
        updateResource('users', userId, updatedUserData).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('name', updatedUserData.name);
            expect(response.body).to.have.property('email', updatedUserData.email);
        }).catch((error) => {
            cy.log('Error updating user:', error);
            throw new Error('User update failed');
        });
    });

    it('should fetch updated user details', () => {
        getResource('users', userId).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('name', updatedUserData.name);
            expect(response.body).to.have.property('email', updatedUserData.email);
        }).catch((error) => {
            cy.log('Error fetching updated user details:', error);
            throw new Error('Failed to fetch updated user details');
        });
    });
    

    it('should delete the user', () => {
        deleteResource('users', userId).then((response) => {
            expect(response.status).to.eq(204);
        }).catch((error) => {
            cy.log('Error deleting user:', error);
            throw new Error('User deletion failed');
        });
    });
});
