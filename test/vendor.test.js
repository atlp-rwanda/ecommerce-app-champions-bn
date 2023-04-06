import supertest from "supertest";
import defaults from "superagent-defaults";
import app from "../src/app";
import {Product} from "../src/database/models"

let vendorToken;
let adminToken;
let buyertoken
let product;
let product1;
let productToUpdate;
let productdisable

const request = defaults(supertest(app));

describe("testing vendor", () => {
  test("adding a vendor", async () => {
    const response = await request.post("/api/vendor/signup").send({
      firstName: "ngarukiye",
      lastName: "sostene",
      email: "shumba2500@gmail.com"
    });
    expect(response.statusCode).toBe(201);
  });
});

describe("validations", () => {
  test("vendor validations", async () => {
    const response = await request.post("/api/vendor/signup").send({
      firstName: "u",
      lastName: "helen",
      email: "mudakikwaaimable05@gmail.com"
    });
    expect(response.statusCode).toBe(401);
  });
});

describe("routes", () => {
  test("testing a wrong route", async () => {
    const response = await request.post("/signu").send({
      firstName: "umurungi",
      lastName: "helen",
      email: "mudakikwaaimable05@gmail.com"
    });
    expect(response.statusCode).toBe(404);
  });
});

describe("tesing signin email and password", () => {
  test("vendor signin", async () => {
    const res = await request.post("/api/user/login").send({
      email: "vendor@yopmail.com",
      password: "vendor@1234"
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    vendorToken = res.body.token;
  });
});

describe("tesing signin email and password", () => {
  test("ADMIN signin", async () => {
    const res = await request.post("/api/user/login").send({
      email: "admin@gmail.com",
      password: "test@1234"
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    adminToken = res.body.token;
  });
});

describe("should create a category", () => {
  it("create a category", async () => {
    const res = await request
      .post("/api/category/create")
      .send({ name: "phones and electricks" })
      .set("token", `Bearer ${vendorToken}`);
    expect(res.statusCode).toBe(201);
  });
});

describe("create a product", () => {
  test("should add a product", async () => {
    const res = await request
      .post("/api/product/create")
      .set("token", `Bearer ${vendorToken}`)
      .field("productOwner", "shumba")
      .field("productName", "car")
      .field("productPrice", "2000")
      .field("category", "food")
      .field("quantity", "20")
      .field("expiredDate", "2023-02-30")
      .field("bonus", "21")
      .field("productDescription", "toyota rava4")
      .attach("productImage",`${__dirname}/test-image.png`);
    expect(res.status).toBe(200);
  });
});
  
describe("DELETE /api/product/delete/:id", () => {
  it("should delete product in seller collection", async () => {
    const response = await request.delete(`/api/product/delete/${1}`)
    .set("token", `Bearer ${vendorToken}`)
    expect(response.statusCode).toBe(204);
    const deletedProduct = await Product.findByPk(1);
    expect(deletedProduct).toBeNull();
  });
  
  it("should return 404 if product not found", async () => {
    const response = await request
    .delete(`/api/product/delete/99999`)
    .set("token", `Bearer ${vendorToken}`)
    expect(response.statusCode).toBe(404);
    expect(response.body.status).toBe("fail");
    expect(response.body.message).toBe("Product not found in your collecton");
    expect(typeof response.body).toBe('object');
  });
  
  it("should return 401 if user is not a vendor", async () => {
    const res = await request.post("/api/user/login").send({
      "email": "buyer@yopmail.com",
      "password": "buyer@1234"
    });
    const buyertoken = res.body.token;
    const response = await request.delete(`/api/product/delete/${1}`)
      .set("token", `${buyertoken}`);
  
    expect(response.statusCode).toBe(401);
    expect(response.body.status).toBe("fail");
    expect(typeof response.body).toBe('object');
  });
  
});

describe("testing signin email and password", () => {    
  test("sign in the buyer",async () => {
    const res = await request.post("/api/user/login").send({
      email:"buyer@yopmail.com", 
      password: "buyer@1234" }); 
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
    buyertoken = res.body.token;
});
});

describe("create report", () => {    
  test("report the product",async () => {
    const res = await request.post("/api/report/create").send({
      activity:"nudity clothes", 
      category: "nudity" ,
      productId:3,
      buyerId:1,
      VendorId:1
  }).set('token',`Bearer ${buyertoken}`); 
    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe('success');
});
});

describe("disable vendor", () => {
  test("it should disable vendor", async () => {
    const response = await request
      .post("/api/vendor/disable/1")
      .set("token", `Bearer ${adminToken}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
  });
});

describe("disable vendor", () => {
  test("it should check if vendor have reported activities", async () => {
    const response = await request
      .post("/api/vendor/disable/2")
      .set("token", `Bearer ${adminToken}`);
    expect(response.statusCode).toBe(404);
    expect(response.body.status).toBe("fail");
  });
});

describe("already suspended vendor", () => {
  test("it should check if vendor is already suspended", async () => {
    const response = await request
      .post("/api/vendor/disable/1")
      .set("token", `Bearer ${adminToken}`);
    expect(response.statusCode).toBe(403);
    expect(response.body.status).toBe("fail");
  });
});

describe("enable vendor account", () => {
  test("it should check if vendor is already active", async () => {
    const response = await request
      .put("/api/vendor/enable/2")
      .set("token", `Bearer ${adminToken}`);
    expect(response.statusCode).toBe(403);
    expect(response.body.status).toBe("fail");
  });
});

describe("enable vendor account", () => {
  test("it should reactivate vendor account", async () => {
    const response = await request
      .put("/api/vendor/enable/1")
      .set("token", `Bearer ${adminToken}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
  });
});




describe("should make product available or unavailable", () => {
  beforeAll(async()=>{
    product= await Product.create({
      VendorId: 1,
      productName: "Test",
      CategoryId: 1,
      productImage: ['https://res.cloudinary.com/dr8kkof5r/image/upload/v1677341496/articles/fz9vsmgcvjd2iem4pkcy.png'],
      productPrice: 1.4,
      quantity: 23,
      available:false,
      productDescription: "this is the best product ever",
      productOwner: "kaleb curry",
      expiredDate:new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    });
    productToUpdate=product.toJSON();



    product1= await Product.create({
      VendorId: 1,
      productName: "Test1",
      CategoryId: 1,
      productImage: ['https://res.cloudinary.com/dr8kkof5r/image/upload/v1677341496/articles/fz9vsmgcvjd2iem4pkcy.png'],
      productPrice: 1.4,
      quantity:0,
      available:true,
      productDescription: "this is the best product ever",
      productOwner: "kaleb curry",
      expiredDate:new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    });
    productdisable=product1.toJSON();
  })
  it("enable product", async () => {

    const res = await request
      .get(`/api/product/enable?searchParam=${productToUpdate.productId}`)
      .set("token", `Bearer ${vendorToken}`);
    expect(res.statusCode).toBe(200);
  });

  it("disable product", async () => {

    const res = await request
      .get(`/api/product/disable?searchParam=${productdisable.productId}`)
      .set("token", `Bearer ${vendorToken}`);
    expect(res.statusCode).toBe(200);
  });

  it("getall product in seller collection", async () => {

    const res = await request
      .get(`/api/product/get-seller-products`)
      .set("token", `Bearer ${vendorToken}`);
    expect(res.statusCode).toBe(200);
  });
});



