const buyerSignup = {
  tags: ["Buyer"],
  description: "create a buyer",
  requestBody: {
    content: {
      "Application/json": {
        schema: {
          type: "object",
          properties: {
            firstName: {
              type: "string",
              description: " first name of a buyer",
              example: "umuntu"
            },
            lastName: {
              type: "string",
              description: "Last name of a buyer",
              example: "Person"
            },
            email: {
              type: "email",
              description: "email of buyer",
              example: "umuntu@gmail.com"
            },
            password: {
              type: "string",
              description: "password of buyer",
              example: "1234567@password"
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
// get single user by id swagger documentation
const getOneProfile = {
  tags: ["Buyer"],
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
  tags: ["Buyer"],
  description: "update a buyer by id",
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
          shipingAddress: {
            type: "string",
            description: " shipping address",
            example: "shippingAddress"
          },
          paymentMethod: {
            type: "string",
            description: "payment",
            example: "businessAddress"
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

const buyerRouteDoc = {
  "/api/buyer/signup": { post: buyerSignup },
  "/api/buyer/oneProfile/{userId}": { get:getOneProfile}, 
  "/api/buyer/profile/{userId}":{put:updateProfile}
};

export default buyerRouteDoc;
