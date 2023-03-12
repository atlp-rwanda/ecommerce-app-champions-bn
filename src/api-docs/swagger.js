// import dotenv from "dotenv";
// import swaggerJSDoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";



// dotenv.config();

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       version: "1.0.0",
//       title: "Ecommerce backend",
//       description: "APIs of Ecommerce project"
//     },
//     servers: [
//       {
//         url: `http://localhost:${process.env.PORT}`,
//         description: "Development server"
//       }
//     ],
//     tags: [         
//       { name: 'Users', description: 'User Routes' },
//     { name: 'Product', description: 'Product Routes' },
//     { name: 'Vendor', description: 'Vendor Routes' }
//   ],
//     components: {
//       securitySchemes: {
//         token: {
//           type: "apiKey",
//           scheme: "bearer",
//           bearerFormat: "JWT",
//           name: "token",
//           in: "header"
//         }
//       },

//       schemas: {
//         vendor: {
//           type: "object",
//           properties: {
//             firstName: {
//               type: "string",
//               required: true,
//               description: "first name"
//             },
//             lastName: {
//               type: "string",
//               required: true,
//               description: "last name"
//             },
//             email: {
//               type: "string",
//               required: true,
//               description: "email@gmail.com"
//             }
//           }
//         }
//       }
//     },
    
//     paths: {
//       "/signup": {
//         post: {
//           tags: ["Vendor"],
//           description: "Register Vendor",
//           requestBody: {
//             required: true,
//             content: {
//               "application/json": {
//                 schema: {
//                   $ref: "#/components/schemas/vendor"
//                 }
//               }
//             }
//           },
//           responses: {
//             200: {
//               description: "vendor succesfully registered"
//             },
//             400: {
//               description: "Bad request"
//             },
//             409: {
//               description: "user already exists"
//             },
//             500: {
//               description: "Internal server error"
//             }
//           }
//         }
//       }
//     }
//   },
//   apis: ["../routes/**/*.js"]
// };

// const swaggerSpec = swaggerJSDoc(options);

// const swaggerDocs = (app) => {
//   app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// };

// export default swaggerDocs;




import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import userRouteDoc from "./buyer.docs";
import vendorRouteDoc from "./vender.docs";

dotenv.config();


const options = {
    definition:{
        openapi:"3.0.0",
        info:{
            version: '1.0.0',
            title: 'Ecommerce backend',
            description: 'APIs of Ecommerce project',
        },
        servers:[
            {
                url: `http://localhost:${process.env.PORT}`,
                description: 'Development server',
              },
              {
                url:'https://ecommerce-app-champions-bn-production.up.railway.app/',
                description: 'development server'
              }
        ],
        tags: [
            { name: 'Users', description: 'User Routes' },
            { name: 'Product', description: 'Product Routes' },
         
          ],
          components: {
            securitySchemes: {
              token: {
                type: 'apiKey',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name:"token",
                in:"header"
              },
            },
          },
          paths:{
            ...userRouteDoc,
            ...vendorRouteDoc
          }
    },
    apis: ['../routes/**/*.js'],
};


const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) =>{
    app.use("/docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));
};

export default swaggerDocs;