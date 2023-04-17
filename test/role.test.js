import request from "supertest";
import app from "../src/app";

let id;
describe("testing create role", () => {
  test("should create role", async () => {
    const res = await request(app).post("/api/role/create").send({
      roleName: "guests"
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe("success");
    expect(typeof res.body).toBe("object");
    id = res.body.data.id;
  });
});

describe("testing delete role", () => {
  test("should delete role", async () => {
    const res = await request(app).delete(`/api/role/delete/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
  });
});
