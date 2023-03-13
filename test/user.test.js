import app from "../src/app";
import request from "supertest";

//testing home page endpoint
describe("testing all routes", () => {
  test("testing the home page endpoint", async () => {
    const response = await request(app).get("/").send();
    expect(response.statusCode).toBe(200);
  });
});

describe("tesing signin email and password",() =>{
  test('user signin',async () =>{
    const res = await request(app).post("/api/vendor/login").send({
      email:"admin@gmail.com",
      password:"test@1234"
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
    expect(typeof res.body.data).toBe('object');
  });
})
