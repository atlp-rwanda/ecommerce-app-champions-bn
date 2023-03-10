import app from "../src/app";
import request from "supertest";

//testing home page endpoint
describe("testing all routes", () => {
  test("testing the home page endpoint", async () => {
    const response = await request(app).get("/").send();
    expect(response.statusCode).toBe(200);
  });
});

describe("vendor", ()=> {
  test("register vendor", async ()=> {
    const response = await request(app).post("/vendor").send({
			firstname: "mudakikwa",
			lastname: "aimable",
			email: "mudakikwaaimable05@gmail.com",
		});
        expect(response.statusCode).toBe(200);
  })
})

