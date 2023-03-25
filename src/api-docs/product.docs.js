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
      "/api/product/searcch": {
        get: searchProduct
      },
  "/api/product/delete/{id}":{delete: deleteProduct}
  };
  
  export default productRouteDoc;
  
