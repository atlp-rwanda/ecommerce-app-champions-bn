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
			firstname: "umurungi",
			lastname: "helen",
			email: "mudakikwaaimable05@gmail.com",
      gender : "male",
      birthDate: "2/20/1995",
      preferredLanguage: "English",
      preferredCurrency: "USD",
		});
        expect(response.statusCode).toBe(200);
  })
})

