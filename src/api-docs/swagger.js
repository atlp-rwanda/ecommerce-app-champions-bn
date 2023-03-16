import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import vendorRouteDoc from "./vendor.docs";
import roleRouteDoc from "./role.docs";
import permissionRouteDoc from "./permission.docs";
import userRouteDoc from "./user.docs";
import buyerRouteDoc from "./buyer.docs";
import logoutRouteDoc from "./user.logout.docs";

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
                description: 'Production server'
              }
        ],
        tags: [
            { name: 'Users', description: 'User Routes' },
            { name: 'Product', description: 'Product Routes' },
            { name: 'Permission', description: 'Permission Routes' },
            { name: 'Role', description: 'Role Routes' },
         
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
            ...vendorRouteDoc,
            ...permissionRouteDoc,
            ...roleRouteDoc,
            ...buyerRouteDoc,
            ...logoutRouteDoc
          }
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: "Development server"
      },
      {
        url: "https://ecommerce-app-champions-bn-production.up.railway.app/",
        description: "development server"
      }
    ],
    tags: [
      { name: "Users", description: "User Routes" },
      { name: "Product", description: "Product Routes" }
    ],
    components: {
      securitySchemes: {
        token: {
          type: "apiKey",
          scheme: "bearer",
          bearerFormat: "JWT",
          name: "token",
          in: "header"
        }
      }
    },
    paths: {
      ...vendorRouteDoc
    },
    apis: ["../routes/**/*.js"]
  };


const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) =>{
    app.use("/docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));
};

export default swaggerDocs;







// "/requestReset": {  // add new path for resetting password
//   post: {
//     tags: ["User"],
//     description: "Reset Password",
//     requestBody: {
//       required: true,
//       content: {
//         "application/json": {
//           schema: {
//             type: "object",
//             properties: {
//               email: {
//                 type: "string",
//                 required: true,
//                 description: "Email address of the user"
//               }
//             }
//           }
//         }
//       }
//     },
//     responses: {
//       200: {
//         description: "Password reset email sent"
//       },
//       400: {
//         description: "Bad request"
//       },
//       404: {
//         description: "User not found"
//       },
//       500: {
//         description: "Internal server error"
//       }
//     }
//   }
// },
// "/resetpassword/{token}": {
//   "post": {
//     "tags": ["User"],
//     "description": "Reset Password",
//     "parameters": [
//       {
//         "name": "token",
//         "in": "path",
//         "required": true,
//         "description": "Reset password token received via email",
//         "schema": {
//           "type": "string"
//         }
//       }
//     ],
//     "requestBody": {
//       "required": true,
//       "content": {
//         "application/json": {
//           "schema": {
//             "type": "object",
//             "properties": {
//               "password": {
//                 "type": "string",
//                 "description": "New password for the user"
//               }
//             },
//             "required": ["password"]
//           }
//         }
//       }
//     },
//     "responses": {
//       "200": {
//         "description": "Password reset successfully"
//       },
//       "400": {
//         "description": "Bad request"
//       },
//       "404": {
//         "description": "User not found"
//       },
//       "500": {
//         "description": "Internal server error"
//       }
//     }
//   }
// }
// }
// },
