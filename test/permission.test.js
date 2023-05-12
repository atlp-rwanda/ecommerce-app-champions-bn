import supertest from "supertest";
import defaults from "superagent-defaults";
import app from "../src/app";

let id;
let adminToken;
const request = defaults(supertest(app));

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

describe("testing create permission", () => {
  test("should create permission", async () => {
    const res = await request
      .post("/api/permission/create")
      .send({
        permissionName: "vendor can-leave-shop",
        permissionFor: "vendor"
      })
      .set("token", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe("success");
    expect(typeof res.body).toBe("object");
    id = res.body.data.id;
  });
});

describe("testing delete permission", () => {
  test("should delete permission", async () => {
    const res = await request
      .delete(`/api/permission/delete/${id}`)
      .set("token", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
  });
});
