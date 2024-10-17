import { apiPath } from "../../src/js/api";
describe("Login Functionality", () => {
	beforeEach(() => {
		// Visit the application login page before each test
		cy.visit("http://localhost:8080");

		// Close the registration modal if it appears
		cy.get("body").then(($body) => {
			if ($body.find(".modal.register").length > 0) {
				cy.get(".modal.register").should("be.visible");
				cy.get('.modal.register button[data-bs-dismiss="modal"]')
					.first()
					.click({ force: true });
			}
		});

		// Allow time for the modal to fully close
		cy.wait(500);
	});

	it("Should log in the user with valid credentials", () => {
		// Open the login modal by clicking the login button
		cy.get('button[data-auth="login"]').first().click({ force: true });

		// Wait for the login modal to appear
		cy.wait(1000);

		// Enter valid login credentials
		cy.get("#loginEmail").type("lol@stud.noroff.no"); // Replace with actual email
		cy.get("#loginPassword").type("lmao12345"); // Replace with actual password

		// Submit the login form
		cy.get('button.btn-success[type="submit"]').first().click();

		// Wait for the login process to complete
		cy.wait(3000);

		// Verify that the user is logged in by checking for the logout button
		cy.get('button[data-auth="logout"]').should("be.visible");
	});

	it("Should not submit the login form with invalid credentials and display an alert", () => {
		// Intercept the login request and simulate a 401 response for invalid credentials
		cy.intercept("POST", `${apiPath}/social/auth/login`, {
			statusCode: 401,
			body: {
				message:
					"Either your username was not found or your password is incorrect",
			},
		}).as("loginRequest");

		// Open the login modal by clicking the login button
		cy.get('button[data-auth="login"]').first().click({ force: true });

		// Wait for the login modal to appear
		cy.wait(1000);

		// Enter invalid login credentials
		cy.get("#loginEmail").type("invalid-email@stud.noroff.no"); // Replace with invalid email
		cy.get("#loginPassword").type("wrong-password"); // Replace with incorrect password

		// Stub the window alert to confirm it is called
		cy.window().then((win) => {
			cy.stub(win, "alert").as("alert"); // Alias the alert function

			// Submit the login form
			cy.get('button.btn-success[type="submit"]').first().click();

			// Wait for the login request to complete
			cy.wait("@loginRequest");

			// Verify the alert was shown with the correct message
			cy.get("@alert").should(
				"have.been.calledWith",
				"Either your username was not found or your password is incorrect",
			);
		});
	});
});
