import request from "supertest";
import app from "../src/app";

// describe("testing create role",() =>{
//   test('should create role', async () => { 
//       const res = await request(app).post("/api/role/create").send({
//           roleName:"buyer"
//       });
//       expect(res.statusCode).toBe(201);
//       expect(res.body.status).toBe('success');
//       expect(typeof res.body).toBe('object');
//    })
// });

// describe("testing create permission",() =>{
//   test('should create permission', async () => { 
//       const res = await request(app).post("/api/permission/create").send({
//           permissionName:"buyer buys product"
//       });
//       expect(res.statusCode).toBe(201);
//       expect(res.body.status).toBe('success');
//       expect(typeof res.body).toBe('object');
//    })
// });

describe("testing buyer signup",() =>{
    test("buyer signup",async () =>{
      const response=await request(app).post("/api/buyer/signup").send({
        firstName: "sostene",
        lastName: "ngarukiyimana",
        email: "ngarukiyimanasostene@gmail.com",
        password: "1234567@password"
      });
      expect(response.statusCode).toBe(201);
    })
  });

  // describe("tesing signin email and password",() =>{
  //   test('user signin',async () =>{
  //     const res = await request(app).post("/api/user/login").send({
  //       email: "ngarukiyimanasostene@gmail.com",
  //       password: "1234567@password"
  //     });
  //     expect(res.statusCode).toBe(200);
  //     expect(res.body.status).toBe('success');
  // })
  // });

