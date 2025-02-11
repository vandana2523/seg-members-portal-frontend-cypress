import signupIndividualPage from "../pageObject/signupWithIndividualPage";
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';


// Define constants for URLs and text
const BASE_URL = 'https://akoni.hub.seguat.com/signup';
const GET_STARTED_TEXT = "Let's get started";
const ACCOUNT_TYPE_TEXT = "What type of account are you setting up?";
const FINANCIAL_ADVISOR_TEXT = "Financial Advisor";
const OTHER_TEXT = "Other";
const INDIVIDUAL_SIGNUP_URL = '/signup/individual';


Given('I am on the SignUp page', () => {
    cy.visit('/signup');  // Replace with your SignUp page URL
});

Then('I should see the correct elements on the Get Started page', () => {
    cy.contains(GET_STARTED_TEXT).should('be.visible');
    cy.contains(ACCOUNT_TYPE_TEXT).should('be.visible');
    cy.get('a[href="/signup/business"]').should('be.visible');
    cy.get('a[href="/signup/individual"]').should('be.visible');
    cy.contains(FINANCIAL_ADVISOR_TEXT).should('be.visible');
    cy.contains(OTHER_TEXT).should('be.visible');
})

Given('I navigate to the individual sign-up page by selecting Individual', () => {
    cy.get('.AppCard__Inner').contains('Individual').click();
    cy.url().should('include', '/individual');  // Check if it navigates to the individual sign-up page
    //Assert that the "Personal details" page is displayed
    cy.contains("Personal details").should('be.visible');
});


When('I enter my personal details', () => {
    signupIndividualPage.personalDetails();
});

When('I select {string} for the joint account option and continue', (choice) => {
    signupIndividualPage.selectJointAccount(choice);
    //signupIndividualPage.clickContinueButton();
})


Then('I should be on the user page', () => {
    //Assert that the "Additional user" page is displayed
    cy.get('h5.Heading.Heading--primary.Heading--sm').should('contain', 'Users');

});

When('I click Continue  on the user page', () => {
    signupIndividualPage.clickContinueButton();
});

When('I check the confirmation options on the Terms & Conditions screen and continue', () => {

    cy.get('.Heading.Heading--primary.Heading--sm').should('contain', 'Terms & conditions');
    signupIndividualPage.termsConditions();
    cy.wait(2000)
    signupIndividualPage.clickContinueButton();   // Click on Continue button on term & condition screen
})

Then('I should be navigated to the success message page', () => {
    cy.get('.Text--nonResponsive').should('contain', 'Please check your email to complete registration.')
})

When('I add a new user by entering the required details', () => {
    signupIndividualPage.clickAddUser();
    cy.wait(2000)
    signupIndividualPage.addUser();
})

Then('I leave all required fields blank on the personal details page', () => {
    signupIndividualPage.clickContinueButton();
})

Then('I should see validation error messages indicating the missing fields', () => {
    const expectedErrors = [
        { message: 'Must select a title' },
        { message: 'Must enter your first name' },
        { message: 'Must enter your last name' },
        { message: 'Must provide an email address' },
        { message: 'Must provide a mobile number' },
        { message: 'Must select an option' }
    ];
    signupIndividualPage.validateAllErrors(expectedErrors);
})

Then('The user is on the Add Beneficiary section by selecting {string} option', (choice) => {
    signupIndividualPage.addBeneficiaryAccount(choice);
})

Then('The user clicks Add without entering detail', () => {
    signupIndividualPage.clickAddBeneficiary();
})

Then('The system should display mandatory field error messages', () => {
    const expectedErrors = [
        { message: 'Must select a title' },
        { message: "Must enter beneficiary's first name" },
        { message: "Must enter beneficiary's surname" },
        { message: "Must provide beneficiary's email address" },
    ];
    signupIndividualPage.validateAllBeneficiary(expectedErrors);
})

Then('The user is on the terms and conditions page', () => {
    signupIndividualPage.personalDetails();
    signupIndividualPage.selectJointAccount("No");
    signupIndividualPage.clickContinueButton();
    signupIndividualPage.clickContinueButton();
})

Then('The user should be get the validation error message when terms and condition not selected {string}', (expectedMessage) => {
    signupIndividualPage.validationTCcheckbox(expectedMessage)
  
})

Then('The user selects Yes for marketing consent and click on the continue button' , () => {
    signupIndividualPage.termsConditionsConsent();
    signupIndividualPage.clickContinueButton();
})

Then('User should get the error message {string} to select the market preferenec option' , (errormessage) => {
    signupIndividualPage.marketPrefernecoptionErrorMessage(errormessage)
})
Given('The user is on the User page', () => {
    signupIndividualPage.personalDetails();
    signupIndividualPage.selectJointAccount("No");
})
When('The user clicks on Add User and the User popup appears', () => {
    signupIndividualPage.clickAddUser();
})
When('The user clicks on Continue without entering the required details', () => {
    signupIndividualPage.clickOnaddUserButton();
})
Then('The user should see validation error messages for the missing fields', () => {
    const expectedErrorMessage = [
        { message: 'Must select a title' },
        { message: "Must enter first name" },
        { message: "Must enter surname" },
        { message: "Must provide an email address" }
    ]
    signupIndividualPage.validateAllIndividual(expectedErrorMessage);
})

Given('I enter my personal details with email {string}', (email) => {
    signupIndividualPage.personalDetailswithexistingEmail(email);
    signupIndividualPage.selectJointAccount("No");
    signupIndividualPage.clickContinueButton();
})
When('I click on the continue', () => {
    signupIndividualPage.clickContinueButton();
})

When('I select the tems and condition and continue', () => {
    signupIndividualPage.termsConditions();
    signupIndividualPage.clickContinueButton();
})

Then('I should see a validation error message {string}', (errormessage) => {
    
    signupIndividualPage.duplicateEmailErrorMessage(errormessage);
})