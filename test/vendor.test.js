import supertest from "supertest";
import defaults from "superagent-defaults";
import app from "../src/app";
import {Product} from "../src/database/models"

let vendorToken;
let adminToken;
let newtoken;

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
      .attach("productImage", `${__dirname}/test-image.png`);
    expect(res.status).toBe(200);
  });
});
  
describe("DELETE /api/product/delete/:id", () => {
  
  let product;
  
  beforeAll(async () => {
    const res = await request.post("/api/user/login").send({
      "email": "vendor1@yopmail.com",
      "password": "vendor@1234"
    });
    newtoken = await res.body.token;

    product = await Product.create({
      VendorId: 1,
      productName: "Test product",
      CategoryId: 1,
      productImage: ['https://res.cloudinary.com/dr8kkof5r/image/upload/v1677341496/articles/fz9vsmgcvjd2iem4pkcy.png'],
      productPrice: 1.4,
      quantity: 23,
      available: true,
      productDescription: "this is the best product ever",
      productOwner: "kaleb curry",
      expiredDate:new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    });
  });
  it("should delete product in seller collection", async () => {
    const response = await request.delete(`/api/product/delete/${product.productId}`)
      .set("token", `${newtoken}`);
    expect(response.statusCode).toBe(204);
  
    const deletedProduct = await Product.findByPk(1);
    expect(deletedProduct).toBeNull();
  });
  
  it("should return 404 if product not found", async () => {
    const res = await request.post("/api/user/login").send({
      "email": "vendor@yopmail.com",
      "password": "vendor@1234"
    });
    const buyertoken = await res.body.token;  
    const response = await request.delete(`/api/product/delete/99999`)
      .set("token", `${buyertoken}`);
  
    expect(response.statusCode).toBe(404);
    expect(response.body.status).toBe("fail");
    expect(response.body.message).toBe("Product not found in your collecton");
  });
  
  it("should return 401 if user is not a vendor", async () => {
    const res = await request.post("/api/user/login").send({
      "email": "buyer@yopmail.com",
      "password": "buyer@1234"
    });
    const buyertoken = res.body.token;
    const response = await request.delete(`/api/product/delete/${product.productId}`)
      .set("token", `${buyertoken}`);
  
    expect(response.statusCode).toBe(401);
    expect(response.body.status).toBe("error");
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



