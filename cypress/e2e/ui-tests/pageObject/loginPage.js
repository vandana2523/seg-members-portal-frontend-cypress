class loginPage {

    static login(username,password) {

        // Enter valid username and password
        cy.get("input[name='email']").type(username)
        cy.get("input[name='password']").type(password)

        // Click the login button
        cy.get("button[type*='button']").eq(1).click();

    }


}

export default loginPage;