import request from "supertest";
import app from "../src/app";

describe("Oauthroute", () => {
  describe("GET /auth/google", () => {
    it("should respond with a 302 status code", async () => {
      const response = await request(app).get("/auth/google");
      expect(response.statusCode).toBe(302);
    });
  });

  describe("GET /auth/google/redirect", () => {
    it("should redirect to / with a 302 status code", async () => {
      const response = await request(app).get("/auth/google/redirect");
      expect(response.statusCode).toBe(302);
      expect(response.header.location).toContain(
        "accounts.google.com/o/oauth2/v2/auth"
      );
    });
  });
});
