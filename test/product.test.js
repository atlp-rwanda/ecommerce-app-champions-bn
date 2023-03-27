
import app from "../src/app";
import supertest  from "supertest";
import defaults from "superagent-defaults"

const request = defaults(supertest(app))
let id;
describe("testing search the product",() =>{
    test('should search product', async () => { 
        const res = await request.get("/api/product/searcch?searchParam=kaleb");
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('success');
        expect(typeof res.body).toBe('object');
     })
  });

  describe("testing get available items",() =>{
    test('get available items', async () => { 
        const res = await request.get("/api/product/getAvailable");
        expect(res.statusCode).toBe(401);
       
     })
  });
   
  describe("testing wrong route for getting available items",() =>{
   test('get available items', async () => { 
       const res = await request.get("/api/product/getAvailabl");
       expect(res.statusCode).toBe(404);
      
    })
 });

 describe("testing get specific item",() =>{
   test('get specific item', async () => { 
       const res = await request.get(`/api/product/getOne/${id}`);
       expect(res.statusCode).toBe(401);
      
    })
 });

  describe("testing get all items",() =>{
    test('get all items', async () => { 
        const res = await request.get("/api/product/getAll");
        expect(res.statusCode).toBe(401);
       
     })
  });
  
  
 
  



  
