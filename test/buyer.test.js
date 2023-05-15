import supertest from "supertest";
import defaults from "superagent-defaults";
import app from "../src/app";
const request = defaults(supertest(app));
let token;
let userId;
let cookie;
let reviewId;

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

  test("Testing existing buyer", async () => {
    const response = await request.post("/api/buyer/signup").send({
      firstName: "sostene",
      lastName: "ngarukiyimana",
      email: "ngarukiyimanasostene@gmail.com",
      password: "1234567@password"
    });

    expect(response.statusCode).toBe(409);
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
  test("sign in the buyer", async () => {
    const res = await request.post("/api/user/login").send({
      email: "ngarukiyimanasostene@gmail.com",
      password: "1234567@password"
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    token = res.body.token;
    cookie = res.headers["set-cookie"][0];
  });

  describe("/addToWishlist/:productId endpoint", () => {
    // test("should return 404 if product is not found", async () => {
    //   const res = await request
    //     .post("/api/product/addToWishlist/100")
    //     .set("token", `Bearer ${token}`);
    //   expect(res.statusCode).toBe(404);
    // });
    test("should add a product to an existing wishlist", async () => {
      const prodId = 2;
      const res = await request
        .post(`/api/product/addToWishlist/${prodId}`)
        .set("token", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
    });
    test("should return 400 if product is already in wishlist", async () => {
      const proId = 2;
      const res = await request
        .post(`/api/product/addToWishlist/${proId}`)
        .set("token", `Bearer ${token}`);
      expect(res.statusCode).toBe(400);
    });
  });
  describe("/retrieveWishlistItems endpoint", () => {
    it("should retrieve wishlist items", async () => {
      const res = await request
        .get("/api/product/retrieveWishlistItems")
        .set("token", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ wishlist: expect.any(Array) });
    });
    test("should return array of all products", async () => {
      const res = await request
        .get("/api/product/retrieveWishlistItems")
        .set("token", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
    });
  });
  test("returns 404 if the profile does not exist", async () => {
    const response = await request
      .put("/999")
      .send({ firstName: "John", lastName: "Doe" })
      .expect(404);
    expect(response.statusCode).toBe(404);
  });
  it("should log out user and clear token cookie", async () => {
    const response = await request
      .get("/api/user/logout")
      .set("token", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("User logged out successfully");
    expect(response.header["set-cookie"]).toBeDefined();
    expect(response.header["set-cookie"][0]).toContain(
      "token=; Path=/; Expires="
    );
  });
});
describe("/cart/add/:productId endpoint", () => {
  test("should return 404 if product is not found", async () => {
    const res = await request
      .post("/api/cart/add/100")
      .set("token", `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
  });
  test("should add a product to an existing cart", async () => {
    const productId = 2;
    const res = await request
      .post(`/api/cart/add/${productId}`)
      .set("token", `Bearer ${token}`);
    expect(res.statusCode).toBe(201);
  });
  test("should return array of all products in cart", async () => {
    const res = await request
      .get("/api/cart/getAll")
      .set("token", `Bearer ${token}`);
    expect(res.statusCode).toBe(201);
  });

  test("should return 400 if product is already in cart", async () => {
    const productId = 2;
    const res = await request
      .post(`/api/cart/add/${productId}`)
      .set("token", `Bearer ${token}`);
    expect(res.statusCode).toBe(409);
  });
  // test("checkout", async () => {
  //   const res = await request
  //     .post("/api/payment/checkout")
  //     .set("token", `Bearer ${token}`)
  //     .send();
  //   expect(res.statusCode).toBe(200);
  // });
});

describe("update cart", () => {
  test("should return 404 if product is not in cart", async () => {
    const productId = 10;
    const res = await request
      .put(`/api/cart/updateCart/${productId}`)
      .send({ quantity: 2 })
      .set("token", `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
  });
  test("testing if the quantity exceeds stock", async () => {
    const productId = 2;
    const res = await request
      .put(`/api/cart/updateCart/${productId}`)
      .send({ quantity: 80 })
      .set("token", `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
  });
  test("testing updating cart", async () => {
    const productId = 2;
    const res = await request
      .put(`/api/cart/updateCart/${productId}`)
      .send({ quantity: 2 })
      .set("token", `Bearer ${token}`);
    expect(res.statusCode).toBe(201);
  });
});

describe("/cart/clear-cart endpoint", () => {
  // it("should clear the cart and return a success message", async () => {
  //   let cartId = 1;
  //   const response = await request
  //     .delete(`/api/cart/clear-cart/${cartId}`)
  //     .set("token", `Bearer ${token}`);
  //   expect(response.statusCode).toBe(200);
  //   expect(response.body.status).toBe("success");
  //   expect(response.body.message).toBe("Cart cleared successfully");
  // });
  it("should return a 404 error if the cart is not found", async () => {
    const nonExistingCartId = 9999;
    const response = await request
      .delete(`/api/cart/clear-cart/${nonExistingCartId}`)
      .set("token", `Bearer ${token}`);
    expect(response.statusCode).toBe(404);
    expect(response.body.status).toBe("fail");
    expect(response.body.message).toBe("Cart not found");
  });
});

describe("Review product", () => {
  test("Create a product review", async () => {
    const productId = 2;
    const response = await request
      .post("/api/review/createReview")
      .send({
        title: "Good product",
        content: "I like this product, it exceeded my expectations",
        rating: 7,
        userId,
        productId
      })
      .set("token", `Bearer ${token}`);

    reviewId = response.body.review.id;

    expect(response.statusCode).toBe(201);
  });

  test("Get product reviews", async () => {
    const response = await request.get(
      `/api/review/getProductReviews/${reviewId}`
    );
    expect(response.statusCode).toBe(200);
  });

  test("Get product rate", async () => {
    const productId = 2;

    const response = await request.get(
      `/api/review/getProductRate/${productId}`
    );
    expect(response.statusCode).toBe(200);
  });

  test("Delete review", async () => {
    const response = await request
      .delete(`/api/review/deleteReview/${reviewId}`)
      .set("token", `Bearer ${token}`);
    expect(response.statusCode).toBe(204);
  });
});

describe("chats endpoint", () => {
  // test("should return single user", async () => {
  //   const res = await request.get("/api/user/single").set("Cookie", cookie);
  //   expect(res.statusCode).toBe(200);
  //   expect(res.body.status).toBe("success");
  // });
  // test("should return 401 if user is not authorized", async () => {
  //   const token =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5peW9tdXRvbmlsdWNpZUBnbWFpbC5jb20iLCJpYXQiOjE2NzkzOTUzMzQsImV4cCI6MTY3OTM5ODkzNH0.N2b04wMRsmWIo2_3-kMS9W4xK7Fdiok5CqZYS6i2BKY";
  //   const res = await request.get("/api/user/single").set("Cookie", token);
  //   expect(res.statusCode).toBe(401);
  // });
  it("should getallchat and return a success message", async () => {
    const response = await request
      .get("/api/chat/get-all-chat")
      .set("token", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
  });
});

describe("testing get specific item", () => {
  test("should return 404 if product not found", async () => {
    const res = await request
      .get(`/api/product/getOne/${9000}`)
      .set("token", `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe("fail");
  });
  test("should get specific item", async () => {
    const res = await request
      .get(`/api/product/getOne/${2}`)
      .set("token", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
  });
});
