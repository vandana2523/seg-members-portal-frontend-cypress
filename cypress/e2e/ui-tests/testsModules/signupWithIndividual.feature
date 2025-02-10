Feature: Akoni Individual Sign-Up  Journey

    Background:
        Given I am on the SignUp page
        And I should see the correct elements on the Get Started page
        And I navigate to the individual sign-up page by selecting Individual

    Scenario: Successfully sign up as an individual with valid data without adding a user and beneficiary
        When I enter my personal details
        And I select "No" for the joint account option and continue
        Then I should be on the user page
        When I click Continue  on the user page
        And I check the confirmation options on the Terms & Conditions screen and continue
        Then I should be navigated to the success message page

    Scenario: Successfully sign up as an individual with valid data with adding beneficiary without adding a user
        When I enter my personal details
        And I select "Yes" for the joint account option and continue
        Then I should be on the user page
        When I click Continue  on the user page
        And I check the confirmation options on the Terms & Conditions screen and continue
        Then I should be navigated to the success message page

    Scenario: Successfully sign up as an individual with valid data without adding beneficiary and adding user
        When I enter my personal details
        And I select "No" for the joint account option and continue
        Then I should be on the user page
        When I add a new user by entering the required details
        When I click Continue  on the user page
        And I check the confirmation options on the Terms & Conditions screen and continue
        Then I should be navigated to the success message page

    Scenario: Successfully sign up as an individual with valid data with adding beneficiary with the adding a user
        When I enter my personal details
        And I select "Yes" for the joint account option and continue
        Then I should be on the user page
        When I click Continue  on the user page
        And I check the confirmation options on the Terms & Conditions screen and continue
        Then I should be navigated to the success message page

    Scenario: Attempt to sign up without entering required fields
        When I leave all required fields blank on the personal details page
        Then I should see validation error messages indicating the missing fields

    Scenario: User attempts to add a beneficiary without required details
        Given The user is on the Add Beneficiary section by selecting "Yes" option
        When The user clicks Add without entering detail
        Then The system should display mandatory field error messages

    Scenario: User tries to proceed without accepting terms and conditions
        Given The user is on the terms and conditions page
        Then The user should be get the validation error message when terms and condition not selected "Please select the terms and condition"

    Scenario:User  tried to proceed further without selecting marketing preferences
        Given The user is on the terms and conditions page
        When The user selects Yes for marketing consent and click on the continue button
        Then User should get the error message "Please select the market preference" to select the market preferenec option

    Scenario: User attempts to add a user without providing required details
        Given The user is on the User page
        When The user clicks on Add User and the User popup appears
        And The user clicks on Continue without entering the required details
        Then The user should see validation error messages for the missing fields

    Scenario: Add user with a duplicate email ID
        Given I enter my personal details with email "binghamlinda24@gmail.com"
        When I click on the continue 
        And I select the tems and condition and continue
        Then I should see a validation error message "This email is already in use"
