import request from "supertest";
import app from "../src/app";

// testing home page endpoint
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
  let resetToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5peW9tdXRvbmlsdWNpZUBnbWFpbC5jb20iLCJpYXQiOjE2NzkzOTUzMzQsImV4cCI6MTY3OTM5ODkzNH0.N2b04wMRsmWIo2_3-kMS9W4xK7Fdiok5CqZYS6i2BKY";

  test("should request password reset email", async () => {
    const res = await request(app).post("/api/user/requestReset").send({
      email: "niyomutonilucie@gmail.com",
    });
    // expect(res.statusCode).toBe(200);
    // expect(res.body.status).toBe("success");
    // expect(typeof res.body.data.resetToken).toBe("string");
    // resetToken = res.body.data.resetToken;
  });

  test("should reset password", async () => {
    const res = await request(app)
      .post(`/api/user/resetpassword/${resetToken}`)
      .send({
        password: "newpassword",
      });
    // expect(res.statusCode).toBe(200);
    // expect(res.body.status).toBe("success");
    // expect(res.body.data).toBe("Password reset successfully");
  });
});



  // // let token;
  // describe("testing password reset request", () => {
  //   test("sending password reset request email", async () => {
  //     const response = await request(app).post("api/user/requestReset").send({
  //       email: "niyomutonilucie@gmail.com"
  //     });
  //     expect(response.statusCode).toBe(200);
  //     expect(response.body.message).toBe("Password reset email sent ");
  //   });
  // });

  // it('should fail to request a password reset for an invalid user email', async () => {
  //   const res = await request(app)
  //     .post('api/user/requestReset')
  //     .send({
  //       email: 'invalidemail'
  //     });
  //   expect(res.statusCode).toEqual(400);
  // });

  // it('should reset the user password', async () => {
  //   const res = await request(app)
  //     .post(`api/user/resetpassword/${token}`)
  //     .send({
  //       password: 'newPassword'
  //     });
  //   expect(res.statusCode).toEqual(200);
  // });
  // it('should fail to reset the user password with an invalid reset token', async () => {
  //   const res = await request(app)
  //     .post('api/user/resetpassword/invalidToken')
  //     .send({
  //       password: 'newPassword'
  //     });
  //   expect(res.statusCode).toEqual(400);
  // });
  // let token ;

  // it('should fail to reset the user password with an expired reset token', async () => {
  //   // simulate an expired reset token
  //   const expiredToken = token.slice(0, -1);
  //   const res = await request(app)
  //     .post(`/api/user/resetpassword/${expiredToken}`)
  //     .send({
  //       password: 'newPassword'
  //     });
  //   expect(res.statusCode).toEqual(400);
  // });

 


