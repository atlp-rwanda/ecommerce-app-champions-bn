import request from "supertest";
import app from "../src/app";

describe("testing create role",() =>{
    test('should create role', async () => { 
        const res = await request(app).post("/api/role/create").send({
            roleName:"vendor"
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.status).toBe('success');
        expect(typeof res.body).toBe('object');
     })
});

describe("testing create permission",() =>{
    test('should create permission', async () => { 
        const res = await request(app).post("/api/permission/create").send({
            permissionName:"vendor create product"
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.status).toBe('success');
        expect(typeof res.body).toBe('object');
     })
});


describe("testing vendor", () => {
    test("adding a vendor", async () => {
      const response = await request(app).post("/api/vendor/signup").send({
        firstName: "ngarukiye",
        lastName: "sostene",
        email: "shumba2500@gmail.com"
      });
      expect(response.statusCode).toBe(201);
    });
  })
  
  describe("validations", () => {
    test("vendor validations", async () => {
      const response = await request(app).post("/api/vendor/signup").send({
        firstName: "u",
        lastName: "helen",
        email: "mudakikwaaimable05@gmail.com"
      });
      expect(response.statusCode).toBe(401);
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