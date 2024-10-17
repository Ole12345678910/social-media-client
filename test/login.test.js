import { login } from "../src/js/api/auth/login";
import { save } from "../src/js/storage/index.js";

// Mock the save and load functions from storage
jest.mock("../src/js/storage/index.js", () => ({
	save: jest.fn(),
	load: jest.fn(), // Add mock for load
}));

describe("login function", () => {
	beforeEach(() => {
		jest.clearAllMocks(); // Clear mocks before each test
	});

	it("should store the token and profile on successful login", async () => {
		// Mock the fetch API to simulate a successful login
		const mockProfile = {
			accessToken: "mockToken",
			name: "TestUser",
			email: "testuser@example.com",
		};

		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve(mockProfile),
			}),
		);

		const profile = await login("testuser@example.com", "password123");

		// Verify the save function is called with correct arguments
		expect(save).toHaveBeenCalledWith("token", "mockToken");
		expect(save).toHaveBeenCalledWith("profile", {
			name: "TestUser",
			email: "testuser@example.com",
		});

		// Verify the profile returned is correct (without accessToken)
		expect(profile).toEqual({
			name: "TestUser",
			email: "testuser@example.com",
		});
	});

	it("should throw an error when login fails", async () => {
		// Mock the fetch API to simulate a failed login
		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: false,
				statusText: "Unauthorized",
			}),
		);

		// Verify that the function throws an error
		await expect(
			login("testuser@example.com", "wrongpassword"),
		).rejects.toThrow("Unauthorized");
	});
});
