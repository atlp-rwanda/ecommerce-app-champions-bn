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
// logout user

describe('User logout', () => {
  let cookie;
  beforeAll(async () => {
    const response = await request(app)
      .post('/api/user/login')
      .send({
        email: "ngarukiyimanasostene@gmail.com",
        password: "1234567@password"
      });
    cookie = response.headers['set-cookie'][0];
  });
  it('should log out user and clear token cookie', async () => {
    const response = await request(app)
      .get('/api/user/logout')
      .set('Cookie', cookie);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe('User logged out successfully');
    expect(response.header['set-cookie']).toBeDefined();
    expect(response.header['set-cookie'][0]).toContain('token=; Path=/; Expires=');
  });
});
