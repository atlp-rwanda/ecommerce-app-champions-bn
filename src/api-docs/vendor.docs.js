const vendorSignup = {
  tags: ["Users"],
  description: "create a vendor",
  requestBody: {
    content: {
      "Application/json": {
        schema: {
          type: "object",
          properties: {
            firstName: {
              type: "string",
              description: " first name of vendor",
              example: "firstName"
            },
            lastName: {
              type: "string",
              description: "Last name of a vendor",
              example: "lastName"
            },
            email: {
              type: "email",
              description: "email of vendor",
              example: "vendor@gmail.com"
            }
          }
        }
      }
    }
  },

  responses: {
    201: {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            type: "object"
          }
        }
      }
    }
  }
};

const vendorRouteDoc = {
  "/signup": {
    post: vendorSignup
  }
};

export default vendorRouteDoc;
