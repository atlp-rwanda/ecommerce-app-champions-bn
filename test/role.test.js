import app from "../src/app";
import request  from "supertest";
let id;
describe("testing create role",() =>{
    test('should create role', async () => { 
        const res = await request(app).post("/api/role/create").send({
            roleName:"buyer"
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.status).toBe('success');
        expect(typeof res).toBe('object');
        id = res.body.data.id;
     })
});

describe("testing delete role",() =>{
    test('should delete role', async () => { 
        const res = await request(app).delete(`/api/role/delete/${id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('success');
     })
})