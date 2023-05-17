const createReview = {
  tags: ["Reviews"],
  description: "Create a product review",
  security: [
    {
      token: []
    }
  ],
  parameters: [
    {
      name: "id",
      in: "path",
      description: "ID of product review",
      required: true,
      schema: {
        type: "string",
        example: "1"
      }
    }
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "Review title",
              example: "Great product!"
            },
            content: {
              type: "string",
              description: "Description of review",
              example: "This is an amazing product that exceeded my expectations."
            },
            rating: {
              type: "number",
              description: "Product rating from 0 to 15",
              example: 10
            },
            // userId: {
            //   type: "number",
            //   description: "ID of the user",
            //   example: 3
            // },
            // productId: {
            //   type: "number",
            //   description: "Product ID",
            //   example: 2
            // }
          },
          required: ["title", "content", "rating", "userId", "productId"]
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
      description: "Internal server error"
    }
  }
};

const getProductReviews = {
  tags: ["Reviews"],
  summary: "Get product reviews by ID",
  description: "Retrieves a list of all reviews of a product",
  parameters: [
    {
      name: "id",
      in: "path",
      description: "ID of product review",
      required: true,
      schema: {
        type: "string",
        example: "1"
      }
    }
  ],
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {}
      }
    },
    404: {
      description: "No products found."
    }
  }
};
const updateReview = {
  tags: ["Reviews"],
  description: "Update a product review",
  security: [
    {
      token: []
    }
  ],
  parameters: [
    {
      name: "id",
      in: "path",
      description: "ID of the review to be updated",
      required: true,
      schema: {
        type: "integer",
        example: 1
      }
    }
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            content: {
              type: "string",
              description: "Description of review",
              example: "This is an amazing product that exceeded my expectations."
            },
            rating: {
              type: "number",
              description: "Product rating from 0 to 10",
              example: 10
            }
          },
          required: ["content", "rating"]
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
      description: "Internal server error"
    }
  }
};

      const deleteReview = {
        tags: ["Reviews"],
        description: "delete product review",
        security: [
          {
            token: []
          }
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "id of product review",
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

  
  
  const getProductRate = {
    tags: ["Reviews"],
    summary: "Get  product Rating",
    description: "Retrieves reviews and product average Rating .",

      parameters: [
        {
          name: "id",
          in: "path",
          description: "id of product review",
          type: "string",
          example: "2"
        }
      ],
      
    responses: {
      200: {
        description: "OK",
        content: {
          "application/json": {

          }
        }
      },
      404: {
        description: "No products found."
      }
    }
  };

    
  const ReviewRouteDoc = {
    "/api/review/createReview/{id}": {
      post: createReview
    },
    "/api/review/getProductReviews/{id}": {
      get: getProductReviews
    },
    "/api/review/getProductRate/{id}": {
      get: getProductRate
    },
    "/api/review/updateReview/{id}": {
      patch: updateReview
    },
    "/api/review/deleteReview/{id}": {
      delete: deleteReview
    }
  };
  
  export default ReviewRouteDoc;