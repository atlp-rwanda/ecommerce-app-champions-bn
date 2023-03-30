
const postCategory = {
    tags: ["Product"],
    description: "create a vendor",
    security: [
      {
        token: []
      }
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "Name of the category",
                example: "Electronics"
              }
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: "category created successfully"
      },
      400: {
        description: "Bad Request"
      },
      500: {
        description: "Internal server error"
      },
      401: {
        description: "Unauthorized"
      }
    }
  };
  
  const categoryRouteDoc = {
    "/api/category/create": {
      post: postCategory
    }
  };
  
  export default categoryRouteDoc;
