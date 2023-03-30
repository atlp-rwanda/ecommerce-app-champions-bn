const TwoFactorAuth = {
  tags: ["Auth"],
  description: "Two Factor Authentication for Vendors and Admins",
  requestBody: {
    required: true,
    content: {
      "Application/json": {
        schema: {
          type: "object",
          properties: {
            validToken: {
              type: "string",
              required: true,
              description: " unique code sent to the vendors email",
              example: "100001"
            }
          }
        }
      }
    }
  },
  responses: {
    200: {
      description: "successful",
      content: {
        "application/json": {
          schema: {
            type: "object"
          }
        }
      }
    },
    400: {
      description: "Bad Request"
    },
    500: {
      description: "Internal server error"
    }
  }
};
const TwoFactorAuthRouteDoc = {
  "/api/user/validate": {
    post: TwoFactorAuth
  }
};
export default TwoFactorAuthRouteDoc;
