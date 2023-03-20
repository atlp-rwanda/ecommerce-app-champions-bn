import app from "../src/app";
import request from "supertest";

//testing home page endpoint
describe("testing all routes", () => {
  test("testing the home page endpoint", async () => {
    const response = await request(app).get("/").send();
    expect(response.statusCode).toBe(200);
  });
});
// testing adding a user endpoint
describe("adding a vendor", () => {
  test("vendor signup", async () => {
    const res = await request(app).post("/signup").send({
      firstName: "umurungi",
      lastName: "helen",
      email: "shumba2500@gmail.com"
    });
    expect(res.statusCode).toEqual(200);
  });
});

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
