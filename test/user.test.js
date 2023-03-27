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
//password reset

describe('password reset', () => {
    describe('POST /api/user/resetpassword/:token', () => {
      let resetToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5peW9tdXRvbmlsdWNpZUBnbWFpbC5jb20iLCJpYXQiOjE2Nzk1NjU3MDQsImV4cCI6MTY3OTU2OTMwNH0.Y_gzRBILG5wpqGItTjcogAWHcP8hAnhr2aVkvGy8ZS4";
      it('should return an error if invalid token', async () => {
        const res = await request(app)
          .post(`/api/user/resetpassword/invalidtoken`)
          .send({ password: 'newpassword123' });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error', 'Invalid token');
      });
      it('should return an error if token has expired', async () => {
        const res = await request(app)
          .post(`/api/user/resetpassword/${resetToken}`)
          .send({ password: 'newpassword123' });
        expect(res.status).toBe(400);
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
