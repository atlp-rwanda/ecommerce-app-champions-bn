import app from "../src/index";
import request from "supertest";

//testing home page endpoint
describe("testing all routes", () => {
  test("testing the home page endpoint", async () => {
    const response = await request(app).get("/").send();
    expect(response.statusCode).toBe(200);
  });
});
// testing adding a user endpoint
describe("tesing user", ()=>{
    test("adding a user", async () =>{
        const response = await request(app).post("/signup").send({
			firstName: "umurungi",
			lastName: "helen",
			email: "user@example.com",
		});
        expect(response.statusCode).toBe(200);
    })
})
