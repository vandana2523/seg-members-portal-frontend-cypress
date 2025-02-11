import { faker } from "@faker-js/faker";
import 'cypress-wait-until';
import { generatePersonalDetails } from '../../../support/data-factory';

class signupIndividualPage {

    static getStarted() {
        // Click the individual account type
        cy.get('[href="/signup/individual"] > .Card').click();
    }

    static personalDetails() {
        let userData = generatePersonalDetails();
        cy.get("input[name='title']").type("Mr")
        cy.get('li').eq(0).click();
        cy.get("input[name='firstName']").type(userData.firstName);
        cy.get("input[name='lastName']").type(userData.lastName);
        cy.get("input[name='email']").type(userData.email);
        cy.get("input[name='mobilePhone']").type(userData.mobileNumber);

    }
    static personalDetailswithexistingEmail(email) {
        let userData = generatePersonalDetails();
        cy.get("input[name='title']").type("Mr")
        cy.get('li').eq(0).click();
        cy.get("input[name='firstName']").type(userData.firstName);
        cy.get("input[name='lastName']").type(userData.lastName);
        cy.get("input[name='email']").type(email);
        cy.get("input[name='mobilePhone']").type(userData.mobileNumber);

    }

    static selectJointAccount(choice) {
        if (choice === "Yes") {
            cy.get('.ChoiceChip').contains('Yes').click();
            this.addBeneficiary();
        } else if (choice === "No") {
            cy.get('.ChoiceChip').contains('No').click();
        } else {
            throw new Error('Invalid choice! Please provide "Yes" or "No".');
        }

        // Click on the Continue button after selecting an option
        cy.get("div.ProcessFooter button").should('be.visible').click();
    }


    static clickContinueButton() {
        cy.contains('button', 'Continue').click();

    }

    static termsConditions() {
        cy.get("input[name='acceptedTAndCs']").click()
        cy.get("div[class*='ChoiceChip']").eq(0).click()
        cy.get("div[class*='ChoiceChip']").eq(3).click()
    }

    static clickAddUser() {
        cy.get('.Button--notLink').eq(1).click();
    }

    static addUser() {
        let userData = generatePersonalDetails();
        cy.get("input[name='title']").type("Mrs").click();
        cy.get("input[name='firstName']").type(userData.firstName);
        cy.get("input[name='lastName']").type(userData.lastName);
        cy.get("input[name='email']").type(userData.email);
        cy.get("input[name='readOnlyAccess']").eq(1).click()
        cy.get('.Button--fullWidth').eq(1).click();

    }

    static validateAllErrors(expectedErrors) {
        cy.get('.Text--error') // Selects all error messages
            .should('have.length', expectedErrors.length) // Ensure correct number of errors
            .each((errorElement, index) => {
                cy.wrap(errorElement) // Wrap each error element
                    .should('be.visible') // Ensure it's displayed
                    .and('contain', expectedErrors[index].message); // Validate text
            });
    }

    static addBeneficiary() {
        let userData = generatePersonalDetails();
        cy.get("input[name='title']").eq(1).type("Mrs").click();
        cy.get("input[name='firstName']").eq(1).type(userData.firstName);
        cy.get("input[name='lastName']").eq(1).type(userData.lastName);
        cy.get("input[name='email']").eq(1).type(userData.email);
        cy.get('.Button--fullWidth').eq(1).click();
    }

    static addBeneficiaryAccount(choice) {
        if (choice === "Yes") {
            cy.get('.ChoiceChip').contains('Yes').click();
        } else if (choice === "No") {
            cy.get('.ChoiceChip').contains('No').click();
        } else {
            throw new Error('Invalid choice! Please provide "Yes" or "No".');
        }
    }
    static clickAddBeneficiary() {
        cy.get('.Button--fullWidth').eq(1).click();
    }

    static validateAllBeneficiary(expectedErrors) {
        cy.get('.Field__HelperText') // Selects all error messages
            .should('have.length', expectedErrors.length) // Ensure correct number of errors
            .each((errorElement, index) => {
                cy.wrap(errorElement) // Wrap each error element
                    .should('be.visible') // Ensure it's displayed
                    .and('contain', expectedErrors[index].message); // Validate text
            });
    }
    static validationTCcheckbox(expectedMessage) {
        cy.get('.Text--xs').eq(1).should('contain', expectedMessage);
    }
    static termsConditionsConsent() {
        cy.get("input[name='acceptedTAndCs']").click()
        cy.get("div[class*='ChoiceChip']").eq(0).click()
    }
    static marketPrefernecoptionErrorMessage(expectedMessage) {
        cy.get('[data-test="terms-error"]').should('contain', expectedMessage);
    }
    static clickOnaddUserButton() {
        cy.get('.Button--fullWidth').eq(1).click();
    }
    static duplicateEmailErrorMessage(errormessage){
        cy.get('.IconButton--responsive').eq(0).click();
        cy.get('.IconButton--responsive').eq(0).click(); 
        cy.get('.Field__HelperText').eq(0).should('contain', errormessage);
    }
    static validateAllIndividual(expectedErrors) {
        cy.get('.Field__HelperText') // Selects all error messages
            .should('have.length', expectedErrors.length) // Ensure correct number of errors
            .each((errorElement, index) => {
                cy.wrap(errorElement) // Wrap each error element
                    .should('be.visible') // Ensure it's displayed
                    .and('contain', expectedErrors[index].message); // Validate text
            });
            cy.get(".Text--xs").eq(6).should('contain', "Must select an option");
    }

}

export default signupIndividualPage;