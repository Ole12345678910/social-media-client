// test/logout.test.js

import { logout } from "../src/js/api/auth/logout"; // Adjust path accordingly
import { remove } from "../src/js/storage/index.js";

jest.mock("../src/js/storage/index.js", () => ({
	remove: jest.fn(),
}));

describe("logout function", () => {
	beforeEach(() => {
		// Clear the mock before each test
		remove.mockClear();
	});

	it("removes the token and profile from storage", () => {
		logout(); // Call the logout function

		// Check if the remove function was called with the correct arguments
		expect(remove).toHaveBeenCalledWith("token");
		expect(remove).toHaveBeenCalledWith("profile");
		expect(remove).toHaveBeenCalledTimes(2); // Ensure it's called exactly two times
	});
});
