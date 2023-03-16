import app from "../src/app";
import request from "supertest";

describe("testing all routes", () => {
  test("testing the home page endpoint", async () => {
    const response = await request(app).get("/").send();
    expect(response.statusCode).toBe(200);
  });
});
// testing adding a user endpoint
describe("testing user", () => {
  test("adding a vendor", async () => {
    const response = await request(app).post("/api/vendor/signup").send({
      firstName: "umurungi",
      lastName: "helen",
      email: "shumba2500@gmail.com"
    });
    expect(response.statusCode).toBe(200);
  });
})
;describe("testing buyer signup",() =>{
  test("buyer signup",async () =>{
    const response=await request(app).post("/api/buyer/buyerSignup").send({
      firstName: "sostene",
      lastName: "Pengarukiyimanason",
      email: "ngarukiyimanasostene@gmail.com",
      password: "1234567@password"
    });
    expect(response.statusCode).toBe(201);
  })
});

describe("testing vendor", () => {
  test("get a vendor by id", async () => {
    const response = await request(app).get("/api/vendor/1");
    expect(response.statusCode).toBe(200);
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

describe("tesing signin email and password",() =>{
  test('user signin',async () =>{
    const res = await request(app).post("/api/vendor/login").send({
      email: "ngarukiyimanasostene@gmail.com",
      password: "1234567@password"
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
    expect(typeof res.body.data).toBe('object');
})
});

