import app from "../src/app";
import supertest  from "supertest";
import defaults from "superagent-defaults"
const request = defaults(supertest(app))
let token;

describe("testing signin email and password", () => {    
    test("sign in the buyer",async () => {
      const res = await request.post("/api/user/login").send({
        email:"buyer@yopmail.com", 
        password: "buyer@1234" }); 
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('success');
      token = res.body.token;
  });
});

describe("create report", () => {    
    test("report the product",async () => {
      const res = await request.post("/api/report/create").send({
        activity:"nudity clothes", 
        category: "nudity" ,
        productId:1,
        buyerId:1,
        VendorId:1
    }).set('token',`Bearer ${token}`); 
      expect(res.statusCode).toBe(201);
      expect(res.body.status).toBe('success');
  });
});

describe("all reports", () => {    
  test("get all reported products",async () => {
    const res = await request.get("/api/report/all"); 
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
});
});
