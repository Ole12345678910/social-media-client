import { defineConfig } from "cypress";

export default defineConfig({
	e2e: {
		baseUrl: "http://127.0.0.1:8080", // Set the baseUrl to match your local server
		specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}", // Ensure Cypress looks for test files in the correct directory
		setupNodeEvents(on, config) {
			// Implement node event listeners if needed
		},
	},
});
