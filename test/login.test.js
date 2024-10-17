// test/login.test.js
import { apiPath } from "../src/js/api/constants.js";
import { headers } from "../src/js/api/headers.js";
import { login } from "../src/js/api/auth/login";
import { save, load } from "../src/js/storage/index.js";

jest.mock("../src/js/storage/index.js", () => ({
	save: jest.fn(),
	load: jest.fn(() => "mockedToken"), // Mocking load to return a token
}));

global.fetch = jest.fn();

describe("Login Function", () => {
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
});
