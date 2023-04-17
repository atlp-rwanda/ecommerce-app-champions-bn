import supertest from "supertest";
import defaults from "superagent-defaults";
import app from "../src/app";

const request = defaults(supertest(app));

let id;
let adminToken;
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
describe("testing create role", () => {
  test("should create role", async () => {
    const res = await request.post("/api/role/create").send({
      roleName: "guests"
    }).set("token", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe("success");
    expect(typeof res.body).toBe("object");
    id = res.body.data.id;
  });
});

describe("testing delete role", () => {
  test("should delete role", async () => {
    const res = await request.delete(`/api/role/delete/${id}`).set("token", `Bearer ${adminToken}`);;
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
  });
});
