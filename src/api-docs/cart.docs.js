const postCart = {
  tags: ["Cart"],
  description: "create a cart",
  parameters: [
    {
      name: "productId",
      in: "path",
      description: "ID of the product to add",
      required: true,
      schema: {
        type: "integer",
        example: 1
      }
    }
  ],
  security: [
    {
      token: []
    }
  ],
  responses: {
    200: {
      description: "Success"
    },
    400: {
      description: "Bad request"
    },
    401: {
      description: "Unauthorized"
    },
    500: {
      description: "internal server error"
    }
  }
};

const updateCart = {
  tags: ["Cart"],
  description: "update a cart",
  parameters: [
    {
      name: "productId",
      in: "path",
      description: "product ID",
      required: true,
      schema: {
        type: "integer",
        example: 1
      }
    }
  ],
  security: [
    {
      token: []
    }
  ],
  requestBody: {
    content: {
      "Application/json": {
        schema: {
          type: "object",
          properties: {
            quantity: {
              type: "integer",
              required: true,
              description: "product quantity"
            }
          },
          example: {
            quantity: 20
          }
        }
      }
    }
  },
  responses: {
    200: {
      description: "Success"
    },
    400: {
      description: "Bad request"
    },
    401: {
      description: "Unauthorized"
    },
    500: {
      description: "internal server error"
    }
  }
};

const cartRouteDoc = {
  "/api/cart/add/{productId}": {
    post: postCart
  },
  "/api/cart/updateCart/{productId}": {
    put: updateCart
  }
};

export default cartRouteDoc;
