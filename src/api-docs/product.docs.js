const product = {
  tags: ["Product"],
  description: "create a product",
  // security: [
  //   {
  //     token: []
  //   }
  // ],
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
            productImage: {
              type: "array",
              items: {
                type: "string",
                format: "binary",
                required: true,
                minItems: 2
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

const getAvailableProducts = {
  tags: ["Product"],
  summary: "Get available products",
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

const getProductById = {
  tags: ["Product"],
  description: "get product from seller collection",
  parameters: [
    {
      name: "id",
      in: "path",
      description: "id of product",
      type: "string",
      example: "1"
    }
  ],
  responses: {
    204: {
      description: "no Content",
      content: {
        "application/json": {
          schema: {
            type: "object"
          }
        }
      }
    },
    404: {
      description: "Not found",
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

    const deleteProduct = {
    tags: ["Product"],
    description: "delete product from seller collection",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "id of product",
        type: "string",
        example: "12"
      }
    ],
    responses: {
      204: {
        description: "no Content",
        content: {
          "application/json": {
            schema: {
              type: "object"
            }
          }
        }
      },
      404: {
        description: "Not found",
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
  
  const productRouteDoc = {
    "/api/product/create": {
      post: product
    },
      "/api/product/searcch": {
        get: searchProduct
      },
      "/api/product/getAll":{
        get:getAllProducts
    }, 
    "/api/product/getAvailable":{
      get: getAvailableProducts
    },
      "/api/product/getOne/{id}":{
        get:getProductById},
      "/api/product/delete/{id}":{
        delete: deleteProduct},
      
  };
  
  export default productRouteDoc;