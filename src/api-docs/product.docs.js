

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
  
  
  
  const productRoutDoc = {
    "/api/product/create": {
      post: product
    },
    "/api/product/getall":{get: listProduct},
 
    "/api/product/disable": {
        get: disableProduct
      },
      "/api/product/enable": {
        get: enableProduct
      },
     
  "/api/product/delete/{id}":{delete: deleteProduct}
  };
  
  export default productRoutDoc;
