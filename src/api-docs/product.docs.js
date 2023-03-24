const searchProduct = {
  tags: ["Product"],
  description: "search a product by name, decription, owner ...",
  parameters: [
    {
      name: "searchParam",
      in: "query",
      description: "the text you want to search",
      type: "string",
      example: "apple"
    }
  ],
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            type: "object"
          }
        }
      }
    },
    404: {
      description: "profile not found"
    }
  }
};

const product = {
    tags: ["Product"],
    description: "create a vendor",
    security: [
      {
        token: []
      }
    ],
    requestBody: {
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            properties: {
              productOwner: {
                type: "string",
                required: true,
                description: "Item owner"
              },
              productName: {
                type: "string",
                required: true,
                description: "Item name"
              },
              productPrice: {
                type: "number",
                required: true,
                description: "Price of the item"
              },
              CategoryId: {
                type: "integer",
                required: true,
                description: "Category of the item"
              },
              quantity: {
                type: "integer",
                required: true,
                description: "Number of the items"
              },
              expiredDate: {
                type: "date",
                required: true,
                description: "Expiry Date of the item",
                example: "2023-02-30"
              },
              bonus: {
                type: "number",
                required: true,
                description: "Bonus section"
              },
              image: {
                type: "array",
                items: {
                  type: "string",
                  format: "binary",
                  required: true,
                  minItems: 4
                }
              },
              productDescription: {
                type: "string",
                required: true,
                description: "product description"
              }
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


  

  const getAllProducts = {
    tags: ["Product"],
    summary: "Get all products",
    description: "Retrieves a list of all products.",
    responses: {
      200: {
        description: "OK",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  productId: {
                    type: "integer",
                    description: "Unique identifier for the product.",
                    example: 1
                  },
                  name: {
                    type: "string",
                    description: "Name of the product.",
                    example: "Product 1"
                  },
                  description: {
                    type: "string",
                    description: "Description of the product.",
                    example: "This is the first product."
                  },
                  price: {
                    type: "number",
                    description: "Price of the product.",
                    example: 9.99
                  },
                  quantity: {
                    type: "integer",
                    description: "Quantity of the product available in stock.",
                    example: 50
                  }
                }
              }
            }
          }
        }
      },
      404: {
        description: "No products found."
      }
    }
  };



  const productRoutDoc = {
    "/api/product/create": {
      post: product
    },
    "api/product/getAll":{
        get:getAllProducts
    }, "/api/product/searcch": {
        get: searchProduct
      }
  };
  export default productRoutDoc;

