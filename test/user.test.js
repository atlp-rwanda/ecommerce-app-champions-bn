import request from "supertest";
import app from "../src/app";

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
  const resetToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5peW9tdXRvbmlsdWNpZUBnbWFpbC5jb20iLCJpYXQiOjE2NzkzOTUzMzQsImV4cCI6MTY3OTM5ODkzNH0.N2b04wMRsmWIo2_3-kMS9W4xK7Fdiok5CqZYS6i2BKY";

  // test("should request password reset email", async () => {
  //   const res = await request(app).post("/api/user/requestReset").send({
  //     email: "niyomutonilucie@gmail.com"
  //   });
  // });

  test("should reset password", async () => {
    const res = await request(app)
      .post(`/api/user/resetpassword/${resetToken}`)
      .send({
        password: "newpassword"
      });
  });
});


