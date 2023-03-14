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
              description: "Last name of a buyer",
              example: "lastName"
            },
            email: {
              type: "email",
              description: "email of buyer",
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

const singleVAendor = {
  tags: ["Users"],
  description: "get a vendor by id",
  parameters:[
    {
        name:"id",
        in:"path",
        description:"id of vendor",
        type:"string",
        example:"1"
    }
],
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
  "/api/vendor/signup": {
    post: vendorSignup
  },
  "/api/vendor/{id}": {
    get: singleVAendor
  }

};

export default vendorRouteDoc;
