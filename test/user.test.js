import app from "../src/app";
import request from "supertest";

describe("testing all routes", () => {
  test("testing the home page endpoint", async () => {
    const response = await request(app).get("/").send();
    expect(response.statusCode).toBe(200);
  });
});

describe("routes", () => {
  test("testing a wrong route", async () => {
    const response = await request(app).post("/signu").send({
      firstName: "umurungi",
      lastName: "helen",
      email: "mudakikwaaimable05@gmail.com"
    });
    expect(response.statusCode).toBe(404);
  });
});
// testing password reset request endpoint

describe("testing password reset", () => {
  let resetToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5peW9tdXRvbmlsdWNpZUBnbWFpbC5jb20iLCJpYXQiOjE2NzkzOTUzMzQsImV4cCI6MTY3OTM5ODkzNH0.N2b04wMRsmWIo2_3-kMS9W4xK7Fdiok5CqZYS6i2BKY";

  test("should request password reset email", async () => {
    const res = await request(app).post("/api/user/requestReset").send({
      email: "niyomutonilucie@gmail.com"
    });
  });

  test("should reset password", async () => {
    const res = await request(app)
      .post(`/api/user/resetpassword/${resetToken}`)
      .send({
        password: "newpassword"
      });
  });
});

describe("two factor authentication for vendors and admins", () => {
  test("should test for invalid token", async () => {
    const sampleVendor = {
      id: "0f9674a3-8172-43c3-924e-cee9aed9d884",
      email: "shumba2500@gmail.com"
    };
    const sampleOTP = "618458";
    const res = await request(app)
      .post("/api/user/validate")
      .set("Cookie", `loginOTP=${sampleOTP}; loginVendorid=${sampleVendor.id}`)
      .send({ validToken: "618458" });
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Invalid token provided");
  });
  test("should test for no cookies found", async () => {
    const response = await request(app)
      .post("/api/vendor/validate")
      .send({ validToken: "618458" });
    expect(response.statusCode).toBe(404);
  });
});
