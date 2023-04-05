
import app from "../src/app";
import supertest  from "supertest";
import defaults from "superagent-defaults"
const request = defaults(supertest(app))

let token;
let userId;
    
describe("testing buyer signup",() =>{
    test("buyer signup",async () =>{
      const response=await request.post("/api/buyer/signup").send({
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
      const res = await request.put(`/api/buyer/profile/${userId}`)
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


  describe("testing signin email and password", () => {    
    test("sign in the buyer",async () => {
      const res = await request.post("/api/user/login").send({
        email:"ngarukiyimanasostene@gmail.com", 
        password: "1234567@password" }); 
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('success');
      token = res.body.token;
  });

  describe('/addToWishlist/:productId endpoint', () => {
    test('should return 404 if product is not found', async () => {
      const res = await request.post('/api/product/addToWishlist/100').set('token', `Bearer ${token}`);
      expect(res.statusCode).toBe(404);
    });
  
    test('should add a product to an existing wishlist', async () => {
       const prodId = 2;
      const res = await request.post(`/api/product/addToWishlist/${prodId}`).set('token',`Bearer ${token}`);
      expect(res.statusCode).toBe(200);
    });

    test('should return 400 if product is already in wishlist', async () => {
      const proId = 2;
      const res = await request.post(`/api/product/addToWishlist/${proId}`)
        .set('token', `Bearer ${token}`)
      expect(res.statusCode).toBe(400);
  
    });
  });


  
  describe('/retrieveWishlistItems endpoint', () => {
  
    it('should retrieve wishlist items', async () => {
  
      const res = await request.get('/api/product/retrieveWishlistItems').set('token',  `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ wishlist: expect.any(Array) });
    });
    test('should return array of all products', async () => {
        const res = await request.get('/api/product/retrieveWishlistItems').set('token',  `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
       
    });})
      
  test('returns 404 if the profile does not exist', async () => {
    const response = await request
      .put('/999')
      .send({ firstName: 'John', lastName: 'Doe' })
      .expect(404);

      expect(response.statusCode).toBe(404);
  });

}); 
