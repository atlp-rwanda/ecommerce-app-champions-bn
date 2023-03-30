import supertest from "supertest";
import defaults from "superagent-defaults";
import app from "../src/app";

const request = defaults(supertest(app));
let token;
let userId;
describe("testing buyer signup", () => {
  test("buyer signup", async () => {
    const response = await request.post("/api/buyer/signup").send({
      firstName: "sostene",
      lastName: "ngarukiyimana",
      email: "ngarukiyimanasostene@gmail.com",
      password: "1234567@password"
    });
    userId = response.body.data.id;
    expect(response.statusCode).toBe(201);
  });
});
describe("tesing update buyer profile update", () => {
  test("update profile", async () => {
    const res = await request.put(`/api/buyer/profile/${userId}`).send({
      birthDate: "2000-9-8",
      gender: "female",
      shipingAddress: "nairobi",
      paymentMethod: "credit-card",
      preferredCurency: "rwf",
      state: "Rwanda",
      city: "kigali",
      postalCode: "0000"
    });
  });
});
describe("testing signin email and password", () => {
  let cookie;
  test("testing buyer signin", async () => {
    const res = await request.post("/api/user/login").send({
      email: "ngarukiyimanasostene@gmail.com",
      password: "1234567@password"
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    token = res.body.token;
  });
  test("returns 404 if the profile does not exist", async () => {
    const response = await request
      .put("/999")
      .send({ firstName: "John", lastName: "Doe" })
      .expect(404);

    expect(response.statusCode).toBe(404);
  });
<<<<<<< HEAD
});
=======

  it('should log out user and clear token cookie', async () => {
    const response = await request(app)
      .get('/api/user/logout')
      .set('Cookie', cookie);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.header['set-cookie']).toBeDefined();
    expect(response.header['set-cookie'][0]).toContain('token=; Path=/; Expires=');
  });
  });



  
>>>>>>> 6340f0c (ft-update-product)
