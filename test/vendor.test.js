import request from "supertest";
import app from "../src/app";

describe("testing vendor", () => {
    test("adding a vendor", async () => {
      const response = await request(app).post("/api/vendor/signup").send({
        firstName: "umurungi",
        lastName: "helen",
        email: "shumba2500@gmail.com"
      });
      expect(response.statusCode).toBe(200);
    });
  })
  
  describe("validations", () => {
    test("vendor validations", async () => {
      const response = await request(app).post("/signup").send({
        firstName: "u",
        lastName: "helen",
        email: "mudakikwaaimable05@gmail.com"
      });
      expect(response.statusCode).toBe(400);
    });
  });
  
  describe("routes", () => {
    test("testing a wrong route", async () => {
      const response = await request(app).post("/signu").send({
        firstName: "umurungi",
        lastName: "helen",
        email: "mudakikwaaimable05@gmail.com"
      });
      expect(response.statusCode).toBe(404);
    });
  });