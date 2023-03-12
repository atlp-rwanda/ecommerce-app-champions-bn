import app from "../src/app";
import request from "supertest";

//testing home page endpoint
describe("testing all routes", () => {
  test("testing the home page endpoint", async () => {
    const response = await request(app).get("/").send();
    expect(response.statusCode).toBe(200);
  });
});


// testing buyer Signup

describe("Testing Buyers", ()=>{

  test("creating a buyer",async ()=>{
    const response=await request(app).post("/buyerSignup").send({
      
      firstName: "umuntu",
      lastName: "Person",
      email: "umuntu10@gmail.com",
      password: "1234567@password"
    
    });

    expect(response.statusCode).toBe(201);
  })
  
  })
  