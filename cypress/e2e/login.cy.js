describe('Login Functionality', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080');

        // Close the register modal if it is open
        cy.get('body').then(($body) => {
            if ($body.find('.modal.register').length > 0) {
                cy.get('.modal.register').should('be.visible');
                cy.get('.modal.register button[data-bs-dismiss="modal"]').first().click({ force: true });
            }
        });

        cy.wait(500); // Allow some time for the modal to close
    });

    it("Should log in the user with valid credentials", () => {
        // Click the Login button to open the login modal
        cy.get('button[data-auth="login"]').first().click({ force: true });

        // Wait for a moment for the modal to appear
        cy.wait(1000);

        // Fill in the login form using ID selectors directly
        cy.get('#loginEmail').type('lol@stud.noroff.no'); // Replace with actual email
        cy.get('#loginPassword').type('lmao12345'); // Replace with actual password

        // Submit the login form
        cy.get('button.btn-success[type="submit"]').first().click();

        cy.wait(4000); // Wait for the login to process

        // Check for presence of a specific element that indicates a successful login
        cy.get('button[data-auth="logout"]').should('be.visible'); // Check that the logout button is visible
    });

    it("Should not submit the login form with invalid credentials and show an alert", () => {
        // Intercept the login request to simulate a 401 response
        cy.intercept('POST', 'https://nf-api.onrender.com/api/v1/social/auth/login', {
            statusCode: 401,
            body: { message: 'Either your username was not found or your password is incorrect' },
        }).as('loginRequest');

        // Click the Login button to open the login modal
        cy.get('button[data-auth="login"]').first().click({ force: true });

        // Wait for a moment for the modal to appear
        cy.wait(1000);

        // Fill in the login form with invalid credentials
        cy.get('#loginEmail').type('invalid-email@stud.noroff.no'); // Replace with invalid email
        cy.get('#loginPassword').type('wrong-password'); // Replace with incorrect password

        // Stub the alert method to check if it's called
        cy.window().then((win) => {
            cy.stub(win, 'alert').as('alert'); // Create an alias for the alert

            // Submit the login form
            cy.get('button.btn-success[type="submit"]').first().click();

            // Wait for the login request to complete
            cy.wait('@loginRequest');

            // Check that the alert was called with the actual message from the API
            cy.get('@alert').should('have.been.calledWith', 'Either your username was not found or your password is incorrect');
        });
    });
});
