

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
  
  const productRoutDoc = {
    "/api/product/create": {
      post: product
    }
  };
  
  export default productRoutDoc;