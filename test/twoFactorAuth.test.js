import request from "supertest";
import app from "../src/app";

// testing home page endpoint
describe("testing all routes", () => {
  test("testing the home page endpoint", async () => {
    const response = await request(app).get("/").send();
    expect(response.statusCode).toBe(200);
  });
});

 // testitng two factor authentication for vendors and admins on the login

describe("two factor authentication for vendors and admins", () => {
  // test("should test for invalid token", async () => {
  //   const sampleVendor = {
  //     id: "0f9674a3-8172-43c3-924e-cee9aed9d884",
  //     email: "shumba2500@gmail.com"
  //   };
  //   const sampleOTP = "618458";
  //   const res = await request(app)
  //     .post("/api/user/validate")
  //     .set("Cookie", `loginOTP=${sampleOTP}; loginVendorid=${sampleVendor.id}`)
  //     .send({ validToken: "618458" });
  //   expect(res.statusCode).toBe(404);
  //   expect(res.body.message).toBe("Invalid token provided");
  // });
  test("should test for no cookies found", async () => {
    const response = await request(app)
      .post("/api/vendor/validate")
      .send({ validToken: "618458" });
    expect(response.statusCode).toBe(404);
  });
});
