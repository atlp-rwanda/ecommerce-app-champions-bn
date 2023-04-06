
  const  response={
    200: {
      description: "Success"
    },
    204: {
      description: "no Content"},
    400: {
      description: "Bad request"
    },
    401: {
      description: "Unauthorized"
    },
    500: {
      description: "Internal server error"
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
  };


  export default response;
  