import supertest from "supertest";
import defaults from "superagent-defaults";
import app from "../src/app";

const request = defaults(supertest(app));

let vendorToken;
let buyertoken
let couponCode;

describe("testing coupon code", () => {
    test("vendor login", async () => {
      const response = await request.post("/api/user/login").send({
        email: "missvendor@yopmail.com",
        password: "vendor@1234",
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
      vendorToken = response.body.token;
    });
});

describe("testing coupon code", () => {
    test("buyer login", async () => {
      const response = await request.post("/api/user/login").send({
        email: "buyer1@yopmail.com",
        password: "buyer@1234",
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
      buyertoken = response.body.token;
    });
});

test("should add a product to an existing cart", async () => {
    const productId = 2;
    const res = await request
      .post(`/api/cart/add/${productId}`)
      .set("token", `Bearer ${buyertoken}`);
    expect(res.statusCode).toBe(201);
  });

describe("testing coupon code", () => {
    test("create coupon code", async () => {
      const response = await request.post("/api/coupon/generate").send({
        "productId":2,
        "discount":10,
        "expirationDate":"2023-04-25",
        "maxUsage":1
      }).set("token", `Bearer ${vendorToken}`);
      expect(response.statusCode).toBe(201);
      expect(response.body.status).toBe("success");
      couponCode=response.body.data.couponCode;
    });
});

describe("testing coupon code", () => {
    test("create coupon code when vendor not logged in", async () => {
      const response = await request.post("/api/coupon/generate").send({
        "productId":1,
        "discount":10,
        "expirationDate":"2023-04-25",
        "maxUsage":1
      });
      expect(response.statusCode).toBe(401);
      expect(response.body.status).toBe("fail");
    });
});

describe("testing coupon code", () => {
    test("create coupon code with wrong discount", async () => {
      const response = await request.post("/api/coupon/generate").send({
        "productId":1,
        "discount":0,
        "expirationDate":"2023-04-25",
        "maxUsage":1
      }).set("token", `Bearer ${vendorToken}`);
      expect(response.statusCode).toBe(409);
      expect(response.body.status).toBe("fail");
    });
});

describe("testing coupon code", () => {
    test("get vendor coupons", async () => {
      const response = await request.get("/api/coupon/my-coupons")
      .set("token", `Bearer ${vendorToken}`);
      expect(response.statusCode).toBe(200);
    });
});

describe("testing coupon code", () => {
    test("get vendor coupons when vendor not logged in", async () => {
      const response = await request.get("/api/coupon/my-coupons");
      expect(response.statusCode).toBe(401);
      expect(response.body.status).toBe("fail");
    });
});

describe("testing coupon code", () => {
    test("applying coupon on checkout, when coupon does not exist", async () => {
      const response = await request.post("/api/coupon/apply-coupon").send({
        "couponCode":"398sONgq@"
      }).set("token", `Bearer ${buyertoken}`);
      expect(response.statusCode).toBe(404);
      expect(response.body.status).toBe("fail");
    });
});

describe("testing coupon code", () => {
    test("applying coupon on checkout", async () => {
      const response = await request.post("/api/coupon/apply-coupon").send({
        "couponCode":couponCode
      }).set("token", `Bearer ${buyertoken}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
    });
});

describe("testing coupon code", () => {
    test("applying coupon when reached maximum usage", async () => {
      const response = await request.post("/api/coupon/apply-coupon").send({
        "couponCode":couponCode
      }).set("token", `Bearer ${buyertoken}`);
      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe("fail");
    });
});

describe("testing coupon code", () => {
    test("update coupon code,on no existing coupon", async () => {
      const response = await request.patch("/api/coupon/update/2").send({
        "discount":5,
        "expirationDate":"2023-04-10",
        "maxUsage":3
      }).set("token", `Bearer ${vendorToken}`);
      expect(response.statusCode).toBe(404);
      expect(response.body.status).toBe("fail");
    });
});

describe("testing coupon code", () => {
    test("update coupon code", async () => {
      const response = await request.patch("/api/coupon/update/1").send({
        "discount":5,
        "expirationDate":"2023-04-10",
        "maxUsage":3
      }).set("token", `Bearer ${vendorToken}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
    });
});

describe("testing coupon code", () => {
    test("delete the coupon code, when the coupon is not found", async () => {
      const response = await request.delete("/api/coupon/delete/2")
      .set("token", `Bearer ${vendorToken}`);
      expect(response.statusCode).toBe(404);
      expect(response.body.status).toBe("fail");
    });
});

describe("testing coupon code", () => {
    test("delete the coupon code", async () => {
      const response = await request.delete("/api/coupon/delete/1")
      .set("token", `Bearer ${vendorToken}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
    });
});