import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import vendorRouteDoc from "./vendor.docs";
import roleRouteDoc from "./role.docs";
import permissionRouteDoc from "./permission.docs";
import userRouteDoc from "./user.docs";
import buyerRouteDoc from "./buyer.docs";
import logoutRouteDoc from "./user.logout.docs";
import GoogleaouthDocs from "./Googleaouth.docs";
import TwoFactorAuthRouteDoc from "./TwoFactorAuth.docs";
import reportRouteDoc from "./reportActivity.docs";

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
        url: `http://localhost:${process.env.PORT}`,
        description: "Development server"
      },
      {
        url: "https://ecommerce-app-champions-bn-production.up.railway.app/",
        description: "Production server"
      }
    ],
    tags: [
      { name: "Users", description: "User Routes" },
      { name: "Product", description: "Product Routes" },
      { name: "Permission", description: "Permission Routes" },
      { name: "Role", description: "Role Routes" },
      { name: "Report", description: "Report Routes" }
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
              userProfileUrl: "https://www.googleapis.com/oauth2/v3/userinfo",
              clientID: process.env.GOOGLE_CLIENT_ID,
              clientSecret: process.env.GOOGLE_SECRET
            }
          }
        }
      }
    },
    paths: {
      ...vendorRouteDoc,
      ...userRouteDoc,
      ...GoogleaouthDocs,
      ...permissionRouteDoc,
      ...roleRouteDoc,
      ...buyerRouteDoc,
      ...logoutRouteDoc,
      ...TwoFactorAuthRouteDoc,
      ...reportRouteDoc
    }
  },
  apis: ["../routes/**/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default swaggerDocs;
