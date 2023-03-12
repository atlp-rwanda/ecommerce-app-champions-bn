import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { userRouteDocs } from "./user.docs";

import Googleaouth from "./Oauth";

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
        url:'https://ecommerce-app-champions-bn-production.up.railway.app',
        description:'Production server'
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
        },
        googleAuth: {
          type: "oauth2",
          flows: {
            authorizationCode: {
              authorizationUrl: "https://accounts.google.com/o/oauth2/auth",
              tokenUrl: "https://oauth2.googleapis.com/token",
              scopes: {
                profile: "Grants profile access"
              },
              redirectUri: "http://localhost:5000/auth/google/redirect",
              userProfileUrl: "https://www.googleapis.com/oauth2/v3/userinfo"
            }
          }
        }
      }
    },
    paths: { ...Googleaouth }

  },
  apis: ["../routes/**/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default swaggerDocs;
