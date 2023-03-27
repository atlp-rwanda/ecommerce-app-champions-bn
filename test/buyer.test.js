import request from "supertest";
import app from "../src/app";

let userId;
describe("testing buyer signup",() =>{
    test("buyer signup",async () =>{
      const response=await request(app).post("/api/buyer/signup").send({
        firstName: "sostene",
        lastName: "ngarukiyimana",
        email: "ngarukiyimanasostene@gmail.com",
        password: "1234567@password"
      });
       userId = response.body.data.id;
      expect(response.statusCode).toBe(201);
    })
  });


  describe("tesing update buyer profile update",() =>{
    test('update profile',async () =>{
      const res = await request(app).put(`/api/buyer/profile/${userId}`)
      .send({
        birthDate:"2000-9-8",
        gender:"female",
        shipingAddress: "nairobi",
        paymentMethod: "credit-card",
        preferredCurency:"rwf",
        state:"Rwanda",
        city:"kigali",
        postalCode:"0000"

      });
    
  }) 
  });

    

  describe("tesing signin email and password",() =>{
    let cookie;
    test('user signin',async () =>{
      const res = await request(app).post("/api/user/login").send({
        email: "ngarukiyimanasostene@gmail.com",
        password: "1234567@password"
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('success');

      cookie = res.headers['set-cookie'][0];

  });

  test('returns 404 if the profile does not exist', async () => {
    const response = await request(app)
      .put('/999')
      .send({ firstName: 'John', lastName: 'Doe' })
      .expect(404);

      expect(response.statusCode).toBe(404);
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



  
