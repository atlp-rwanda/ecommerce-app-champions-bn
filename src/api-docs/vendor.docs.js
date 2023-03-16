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
// get single user by id swagger documentation
const getOneProfile = {
  tags: ["Users"],
  summary: "get user by path id",
  description: "get single user by id",
  parameters: [
    {
      name: "userId",
      in: "path",
      description: "id of the user",
      type: "string",
      example: "hfbjsd2345njndfjhcbe3",
    },
  ],
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            type: "object",
          },
        },
      },
    },
    404: {
      description: "profile not found",
    },
  },
};
const updateProfile = {
  tags: ["Users"],
  description: "update a vendor by id",
  parameters:[
    {
        name:"id",
        in:"path",
        description:"id of vendor",
        type:"string",
        example:"1"
    }
],
security: [
  {
    token: [],
  },
],
requestBody: {
  content: {
    "Application/json": {
      schema: {
        type: "object",
        properties: {
          birthDate: {
            type: "date",
            description: " birth date",
            example: "YYYY-MM-DD"
          }, 
          gender: {
            type: "string",
            description: " personal gender",
            example: "female"
          },
           businessName: {
            type: "string",
            description: "name of the business",
            example: "ali shop"
          },
          businessAddress: {
            type: "string",
            description: "business address",
            example: "123"
          },
          accountNumber: {
            type: "integer",
            description: "account number of vendor",
            example: "12345"
          },
          taxIdNumber: {
            type: "integer",
            description: "tax id ",
            example: "12345"
          },
          typeOfProducts: {
            type: "string",
            description: "types of products",
            example: "imboga"
          },
        
          preferredCurency: {
            type: "string",
            description: "currency of vendor",
            example: "preferredCurrency"
          },
          state: {
            type: "string",
            description: "state of vendor",
            example: "state"
          },
          city: {
            type: "string",
            description: "city of vendor",
            example: "city"
          },
          postalCode: {
            type: "string",
            description: "postal code of vendor",
            example: "postalCode"
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
  "/api/vendor/signup": {
    post: vendorSignup
  },
  "/api/vendor/{id}": {
    get: singleVAendor
  },
  "/api/vendor/profile/{userId}":{
    put:updateProfile
  }, 
  "/api/vendor/oneProfile/{userId}":{
    get:getOneProfile
  }

};

export default vendorRouteDoc;
