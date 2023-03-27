import app from "../src/app";
import request  from "supertest";
let id;
describe("testing create permission",() =>{
    test('should create permission', async () => { 
        const res = await request(app).post("/api/permission/create").send({
            permissionName:"guest can-visit-shop"
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.status).toBe('success');
        expect(typeof res.body).toBe('object');
        id = res.body.data.id;
     })
});

describe("testing delete permission",() =>{
    test('should delete permission', async () => { 
        const res = await request(app).delete(`/api/permission/delete/${id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('success');
     })
})