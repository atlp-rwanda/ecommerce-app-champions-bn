import request from "supertest";
import app from "../src/app";

describe("testing search the product",() =>{
    test('should search product', async () => { 
        const res = await request(app).get("/api/product/searcch?searchParam=kaleb");
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('success');
        expect(typeof res.body).toBe('object');
     })
  });