import app from "../src/app";
import request from "supertest";

describe("testing all routes", () => {
  test("testing the home page endpoint", async () => {
    const response = await request(app).get("/").send();
    expect(response.statusCode).toBe(200);
  });
});
// // testing adding a user endpoint
// describe("testing user", () => {
//   test("adding a vendor", async () => {
//     const response = await request(app).post("/api/vendor/signup").send({
//       firstName: "umurungi",
//       lastName: "helen",
//       email: "mudakikwaaimable05@gmail.com"
//     });
//     expect(response.statusCode).toBe(200);
//   });
// });

// describe("testing vendor", () => {
//   test("get a vendor by id", async () => {
//     const response = await request(app).get("/api/vendor/1");
//     expect(response.statusCode).toBe(200);
//   });
// });

// describe("validations", () => {
//   test("vendor validations", async () => {
//     const response = await request(app).post("/signup").send({
//       firstName: "u",
//       lastName: "helen",
//       email: "mudakikwaaimable05@gmail.com"
//     });
//     expect(response.statusCode).toBe(400);
//   });
// });

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
