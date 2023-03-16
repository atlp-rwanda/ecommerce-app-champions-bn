import request from "supertest";
import app from "../src/app";

describe("testing buyer signup",() =>{
    test("buyer signup",async () =>{
      const response=await request(app).post("/api/buyer/signup").send({
        firstName: "sostene",
        lastName: "Pengarukiyimanason",
        email: "ngarukiyimanasostene@gmail.com",
        password: "1234567@password"
      });
      expect(response.statusCode).toBe(201);
    })
  });