/* test/login.test.js
import { apiPath } from "../src/js/api/constants.js"; // Adjust this path according to your project structure
import { headers } from "../src/js/api/headers.js";
import { login } from "../src/js/api/auth/login";
import { save, load } from "../src/js/storage/index.js";

global.fetch = jest.fn();

jest.mock("../src/js/storage/index.js", () => ({
	save: jest.fn(),
	load: jest.fn(() => "mockedToken"), // Mock load function to return a token
}));

describe("login function", () => {
	beforeEach(() => {
		fetch.mockClear();
		save.mockClear();
		load.mockClear();
	});

	it("stores a token when provided with valid credentials", async () => {
		const email = "lol@stud.noroff.no"; // Test email
		const password = "lmao12345"; // Test password
		const mockToken = "mockedAccessToken"; // Mock token response

		// Mock the API response
		fetch.mockResolvedValueOnce({
			ok: true,
			json: async () => ({
				accessToken: mockToken,
				username: "testUser",
			}),
		});

		const result = await login(email, password);

		expect(fetch).toHaveBeenCalledWith(`${apiPath}/social/auth/login`, {
			method: "post",
			body: JSON.stringify({ email, password }),
			headers: headers("application/json"),
		});

		expect(save).toHaveBeenCalledWith("token", mockToken); // Check if token is saved
		expect(save).toHaveBeenCalledWith("profile", { username: "testUser" }); // Check profile saving
		expect(result).toEqual({ username: "testUser" }); // Check the returned profile
	});

	it("throws an error when the login fails", async () => {
		const email = "lol@stud.noroff.no"; // Test email
		const password = "wrongPassword"; // Invalid password

		fetch.mockResolvedValueOnce({
			ok: false,
			statusText: "Unauthorized",
		});

		await expect(login(email, password)).rejects.toThrow("Unauthorized");
		expect(save).not.toHaveBeenCalled(); // Ensure save is not called when login fails
	});
});
*/