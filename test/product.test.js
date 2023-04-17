import request from "supertest";
import app from "../src/app";
let id;
describe("testing search the product", () => {
  test("should search product", async () => {
    const res = await request(app).get(
      "/api/product/searcch?searchParam=kaleb"
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(typeof res.body).toBe("object");
  });
});

describe("testing /api/product/recommended endpoint", () => {
  it("should get recommended product", async () => {
    const res = await request(app).get(
      "/api/product/recommended?searchParam=kaleb"
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(typeof res.body).toBe("object");
  });

  it("should get  404 for not found", async () => {
    const res = await request(app).get("/api/product/recommend");
    expect(res.statusCode).toBe(404);
  });
});

describe("testing get available items", () => {
  test("get available items", async () => {
    const res = await request(app).get("/api/product/getAvailable");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
  });
});
describe("testing wrong route for getting available items", () => {
  test("get available items", async () => {
    const res = await request(app).get("/api/product/getAvailabl");
    expect(res.statusCode).toBe(404);
  });
});
describe("testing get specific item", () => {
  test("get specific item", async () => {
    const res = await request(app).get(`/api/product/getOne/${id}`);
    expect(res.statusCode).toBe(401);
  });
});
describe("testing get all items", () => {
  test("get all items it should return 401", async () => {
    const res = await request(app).get("/api/product/getAll");
    expect(res.statusCode).toBe(401);
    expect(res.body.status).toBe("fail");
  });
});
describe("testing get expired products", () => {
  test("get all expired products", async () => {
    const res = await request(app).get("/api/product/checkExpired");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
  });
});
