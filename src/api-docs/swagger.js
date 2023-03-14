import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import vendorRouteDoc from "./vendor.docs";

dotenv.config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Ecommerce backend",
      description: "APIs of Ecommerce project"
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server"
      },
      {
        url: "https://ecommerce-app-champions-bn-production.up.railway.app/",
        description: "development server"
      }
    ],
    tags: [
      { name: "User", description: "User Routes" },
      { name: "Product", description: "Product Routes" },
      { name: "Vendor", description: "Vendor Routes" }
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
    paths: {}
  },
  apis: ["../routes/**/*.js"]
};


const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) =>{
    app.use("/docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));
};

export default swaggerDocs;