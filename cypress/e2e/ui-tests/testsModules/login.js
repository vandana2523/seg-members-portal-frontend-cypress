import loginPage from "../pageObject/loginPage";

// Define constants for URLs and error messages
const BASE_URL = 'https://akoni.hub.seguat.com';
const LOGIN_URL = `${BASE_URL}/login`;
const INVALID_CREDENTIALS_ERROR = 'These credentials do not match our records';
const EMPTY_CREDENTIALS_EMAIL_ERROR = 'Must enter an email address';
const EMPTY_CREDENTIALS_PASSWORD_ERROR = 'Must enter a password';

describe('Login Functionality', () => {
    // Common data for valid and invalid users
    const validUser = {
      username: 'testseller51@gmail.com',
      password: '#!jFG$852_eJN2@71'
    }
  
    const invalidUser = {
      username: 'invalid_user@gmail.com',
      password: 'wrong_password'
    }
  
    // Using beforeEach() to run common steps before each test
    beforeEach(() => {
      // Visit the login page before each test
      cy.visit(LOGIN_URL)
    })
  
    it('should login successfully with valid credentials', () => {
        // Use the loginPage to perform login with valid credentials
        loginPage.login(validUser.username, validUser.password)

        // Assert that the user is redirected to the dashboard
        cy.url().should('include', '/dashboard')
  
        // Assert that the user's name appears on the dashboard
        cy.contains(`Welcome, ${validUser.username}`).should('be.visible')
    })
  
    it('should show an error message with invalid credentials', () => {
        // Use the loginPage to perform login with invalid credentials
        loginPage.login(invalidUser.username, invalidUser.password)

        // Assert that the error message is shown
        cy.contains(INVALID_CREDENTIALS_ERROR).should('be.visible')
  
        // Assert that the user is still on the login page
        cy.url().should('include', '/login')
    })

    it('should show an error message with empty credentials', () => {
        // Click the login button without entering any credentials
        cy.get("button[type*='button']").eq(1).click();
    
        // Assert that the error messages for both fields are shown
        cy.contains(EMPTY_CREDENTIALS_EMAIL_ERROR).should('be.visible')
        cy.contains(EMPTY_CREDENTIALS_PASSWORD_ERROR).should('be.visible')
    
        // Assert that the user is still on the login page
        cy.url().should('include', '/login')
    })
})
