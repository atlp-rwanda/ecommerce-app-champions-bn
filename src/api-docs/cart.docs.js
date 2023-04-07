
import response from "./response";

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
  responses:response
};

const getCartItems = {
  tags: ["Cart"],
  description: "list all items in cart",
  parameters: [],
  security: [
    {
      token: []
    }
  ],
  responses: response
};

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
            token: [],
          },
        ],
    responses: response
      };


  const clearCart = {
    tags: ["Cart"],
    description: "clearing buyer's cart",
    security: [
      {
        token: []
      }
    ],
    parameters: [
      {
        name: "id",
        in: "path",
        description: "cart id",
        type: "integer",
        example: 1
      }
    ],
    responses:response
  };
    
  
 const cartRouteDoc = {
    "/api/cart/add/{productId}":{
        post:postCart
    },
    "/api/cart/clear-cart/{id}":{
      delete:clearCart
  },
  "/api/cart/getAll": {
    get: getCartItems
  },
  "/api/cart/updateCart/{productId}": {
    put: updateCart
  }
 };

 export default cartRouteDoc;
