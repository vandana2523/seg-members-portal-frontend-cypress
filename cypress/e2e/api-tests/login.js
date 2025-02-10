
describe('User Login API Tests', () => {
    let userData;
    let invalidUserData;

    before(() => {
        // Load valid user data from the fixture file
        cy.fixture("akoni-users").then((user) => {
            userData = user; // Assume this contains { username: 'validUser', password: 'validPassword' }
        });
        invalidUserData = { email: 'invalid@example.com', password: 'wrongPassword' }; // Invalid login details
    });

    it('should log in successfully with valid details', () => {
        // Use the custom login command directly
        cy.login(userData.username, userData.password).then((loginResponse) => {
            expect(loginResponse.status).to.eq(200);
            expect(loginResponse.body).to.have.property('token'); // Assuming a token is returned
        });
    }).catch((error) => {
        cy.log('Error creating user:', error);
        throw new Error('User creation failed');
    });

    it('should not log in with invalid details', () => {
        cy.login(invalidUserData.email, invalidUserData.password).then((response) => {
            expect(response.status).to.eq(401); // Unauthorized
            expect(response.body.message).to.include('Invalid credentials'); // Update based on actual message
        }).catch((error) => {
            cy.log('Error during login:', error);
            throw new Error('Login failed');
        });
    });

    it('should not log in with missing password', () => {
        const missingPasswordData = { email: userData.email }; // Missing password

        cy.login(missingPasswordData.email).then((response) => {
            expect(response.status).to.eq(400); // Bad Request
            expect(response.body.message).to.include('Password is required'); // Update based on actual message
        }).catch((error) => {
            cy.log('Error during login:', error);
            throw new Error('Login failed');
        });
    });

    it('should not log in with unregistered email', () => {
        const unregisteredEmailData = { email: 'notregistered@example.com', password: 'somePassword' };

        cy.login(unregisteredEmailData.email, unregisteredEmailData.password).then((response) => {
            expect(response.status).to.eq(404); // Not Found
            expect(response.body.message).to.include('User not found'); // Update based on actual message
        }).catch((error) => {
            cy.log('Error during login:', error);
            throw new Error('Login failed');
        });
    });

});
