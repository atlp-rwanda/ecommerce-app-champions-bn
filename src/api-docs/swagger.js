import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import userRouteDoc from "./buyer.docs";
import vendorRouteDoc from "./vendor.docs";
import roleRouteDoc from "./role.docs";
import permissionRouteDoc from "./permission.docs";

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
            ...roleRouteDoc
          }
    },
    apis: ['../routes/**/*.js'],
};


const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) =>{
    app.use("/docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));
};

export default swaggerDocs;