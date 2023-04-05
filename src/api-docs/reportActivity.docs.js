const getAllReports = {
  tags: ["Reports"],
  description: "get all reports",
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            type: "object",
          },
        },
      },
    },
    404: {
      description: "profile not found",
    },
  },
};
const createReport = {
    tags: ["Reports"],
    description: "report the product",
    requestBody: {
      content: {
        "Application/json": {
          schema: {
            type: "object",
            properties: {
              activity: {
                type: "string",
                description: "activity",
                example: "Illegal product"
              },
              category: {
                type: "string",
                description: "category",
                example: "promoting rape"
              },
              productId: {
                type: "number",
                description: "productId",
                example: "1"
              },
              buyerId:{
                type: "number",
                description: "buyerId",
                example: "2"
              },
              VendorId:{
                type: "number",
                description: "VendorId",
                example: "1"
              }
            }
          }
        }
      }
    },
  
    responses: {
      201: {
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
  
  const reportRouteDoc = {
    "/api/report/all": { get: getAllReports },
    "/api/report/create": { post: createReport },
  };
  
  export default reportRouteDoc;
  