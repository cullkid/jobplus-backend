const request = require("supertest");
const app = require("../app");
const authMiddleware = require("./auth.middleware");

describe("Auth Middleware", () => {
  it("should return 401 if no token is provided", async () => {
    const response = await request(app).get("/protected-route").expect(401);

    expect(response.body.error).toBe("Please Authenticate");
  });

  it("should return 401 if an invalid token is provided", async () => {
    const response = await request(app)
      .get("/protected-route")
      .set("Authorization", "Bearer invalid_token")
      .expect(401);

    expect(response.body.error).toBe("JsonWebTokenError: invalid token");
  });

  it("should return 401 if the user does not exist", async () => {
    // Mock the db.query function to return an empty result
    jest.mock("../config/database", () => ({
      query: jest.fn().mockResolvedValue({ rows: [] }),
    }));

    const token = "valid_token"; // Replace with a valid token for testing

    const response = await request(app)
      .get("/protected-route")
      .set("Authorization", `Bearer ${token}`)
      .expect(401);

    expect(response.body.error).toBe("User not found");
  });

  it("should call next() and set req.user if the token is valid and the user exists", async () => {
    // Mock the db.query function to return a user object
    jest.mock("../config/database", () => ({
      query: jest.fn().mockResolvedValue({
        rows: [{ id: 1, username: "testuser" }],
      }),
    }));

    const token = "valid_token"; // Replace with a valid token for testing

    const response = await request(app)
      .get("/protected-route")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    // Add your assertions for req.user here
    expect(response.body.user).toEqual({ id: 1, username: "testuser" });
  });
});
