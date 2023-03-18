/* eslint-disable */
const login = {
  tags: ["User"],
  description: "User Login",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            email: {
              type: "string",
              description: "email of the user",
              example: "admin@gmail.com"
            },
            password: {
              type: "string",
              description: "password of user",
              example: "test@1234"
            }
          }
        }
      }
    }
  },
  responses: {
    200: {
      description: "vendor succesfully registered"
    },
    400: {
      description: "Bad request"
    },
    409: {
      description: "user already exists"
    },
    500: {
      description: "Internal server error"
    }
  }
};

const userRouteDoc = {
  "/api/user/login": { post: login }
};

export default userRouteDoc;
