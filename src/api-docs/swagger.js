import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

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
<<<<<<< HEAD
        url: "http://localhost:5050",
        description: "Development server"
      }
    ],
    tags: [],
=======
        url: "http://localhost:5000",
        description: "Development server"
      }
    ],
    tags: [
      { name: "User", description: "User Routes" },
      { name: "Product", description: "Product Routes" },
      { name: "Vendor", description: "Vendor Routes" }
    ],
>>>>>>> e3341bd (fix(appsetup): eslint fix)
    components: {
      securitySchemes: {
        token: {
          type: "apiKey",
          scheme: "bearer",
          bearerFormat: "JWT",
          name: "token",
          in: "header"
        }
<<<<<<< HEAD
      },
      schemas: {
        vendor: {
          type: "object",
          properties: {
            firstName: {
              type: "string",
              required: true,
              description: "first name"
            },
            lastName: {
              type: "string",
              required: true,
              description: "last name"
            },
            email: {
              type: "string",
              required: true,
              description: "email@gmail.com"
            }
          }
        }
      }
    },
    paths: {
      "/signup": {
        post: {
          tags: ["Vendor"],
          description: "Register Vendor",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/vendor"
                }
              }
            }
          },
          responses: {
            200: {
              description: "vendor succesfully registered"
            },
            400: {
              description: "Bad request"
            },
            409: {
              description: "user already exists"
            },
            500: {
              description: "Internal server error"
            }
          }
        }
      }
    }
=======
      }
    },
    paths: {}
>>>>>>> e3341bd (fix(appsetup): eslint fix)
  },
  apis: ["../routes/**/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default swaggerDocs;
