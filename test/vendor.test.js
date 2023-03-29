import supertest from "supertest";
import defaults from "superagent-defaults"
import app from "../src/app";

let token;

const request = defaults(supertest(app))

describe("testing vendor", () => {
    test("adding a vendor", async () => {
      const response = await request.post("/api/vendor/signup").send({
        firstName: "ngarukiye",
        lastName: "sostene",
        email: "shumba2500@gmail.com"
      });
      expect(response.statusCode).toBe(201);
    });
  })
  
  describe("validations", () => {
    test("vendor validations", async () => {
      const response = await request.post("/api/vendor/signup").send({
        firstName: "u",
        lastName: "helen",
        email: "mudakikwaaimable05@gmail.com"
      });
      expect(response.statusCode).toBe(401);
    });
  });
  
  describe("routes", () => {
    test("testing a wrong route", async () => {
      const response = await request.post("/signu").send({
        firstName: "umurungi",
        lastName: "helen",
        email: "mudakikwaaimable05@gmail.com"
      });
      expect(response.statusCode).toBe(404);
    });
  });

  describe("tesing signin email and password",() =>{
    let cookie;
    test('user signin',async () =>{
      const res = await request.post("/api/user/login").send({
        email: "admin@gmail.com",
        password: "test@1234"
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('success');
      token=res.body.token;
  });
});

  describe("disable vendor", () => {
    test("it should disable vendor", async () => {
      const response = await request.post("/api/vendor/disable/1").set('token',`Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');
    });
  });