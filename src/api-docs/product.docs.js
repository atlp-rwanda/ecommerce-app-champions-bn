const postProduct = {
  tags: ["Product"],
  description: "create a product",
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
            category: {
              type: "string",
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
    }}}};
        const addToWishlist = {
          tags: ["Product"],
          description: "Add a product to a user's wishlist",
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
          responses: {
            200: {
              description: "OK",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        description: "Message indicating that the product was added to the wishlist",
                        example: "Product added to wishlist"
                      },
                      product: {
                        type: "object",
                        description: "The product that was added to the wishlist",
                        properties: {
                          
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
const updateProduct = {
  tags: ["Product"],
  description: "update product",
  security: [
    {
      token: []
    }
  ],
  parameters: [
    {
      in: "path",
      name: "id",
      description: "id of the product",
      required: true,
      schema: {
        type: "integer",
        format: "number"
      }
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

const deleteProduct = {
  tags: ["Product"],
  description: "delete product from seller collection",
  security: [
    {
      token: []
    }
  ],
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
  
  const retrieveProductItems = {
    tags: ["Product"],
    description: "Retrieve all products in a user's wishlist",
    security: [
      {
        token: [],
      },
    ],
    responses: {
      200: {
        description: "OK",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                wishlist: {
                  type: "array",
                  description: "The array of products in the wishlist",
                  items: {
                    type: "object",
                    properties: {
                      // Define the properties of the product object here
                    }
                  }
                }
              }
            }
          }
        }
      },
      500: {
        description: "Internal Server Error",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  description: "The error message",
                  example: "Internal Server Error"
                }
              }
            }
          }
        }
      }
    }
  };
   


  const listProduct = {
    tags: ["Product"],
    description: "list all product from seller collection",
    parameters: [],
    responses: {
      200: {
        description: "ok",
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
  



  const disableProduct = {
    tags: ["Product"],
    description: "make product unavailable",
    parameters: [
      {
        name: "searchParam",
        in: "query",
        description: "the text you want to search",
        type: "string",
        example: "1"
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
      }
    }
  };



  const enableProduct = {
    tags: ["Product"],
    description: "make product available",
    parameters: [
      {
        name: "searchParam",
        in: "query",
        description: "the text you want to search",
        type: "string",
        example: "2"
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
      }
    }
  };
  
  
  
  
  
  const productRouteDoc = {
    "/api/product/create": {
      post: postProduct
    },
    "/api/product/update/{id}": {
      patch: updateProduct
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
        "/api/product/addToWishlist/{productId}": { 
          post: addToWishlist },
          "/api/product/retrieveWishlistItems": { 
            get: retrieveProductItems }
      
    "/api/product/getall":{get: listProduct},
   
    "/api/product/disable": {
        get: disableProduct
      },
      "/api/product/enable": {
        get: enableProduct
      },
     
 
  };
  
  export default productRouteDoc;
