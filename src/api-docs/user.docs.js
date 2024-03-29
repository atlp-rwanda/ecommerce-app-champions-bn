/* eslint-disable */
const login = {
  tags: ["Users"],
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
}


const requestReset = {
    tags: ["Users"],
    description: "Request password reset email",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: {
                type: "string",
                description: "The email of the user whose password needs to be reset",
                example: "example@example.com"
              }
            },
            required: ["email"]
          }
        }
      }
    },
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
                  description: "Success message",
                  example: "Password reset email sent successfully"
                }
              }
            }
          }
        }
      },
      400: {
        description: "Bad Request",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  description: "Error message",
                  example: "Invalid email address"
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
                message: {
                  type: "string",
                  description: "Error message",
                  example: "Server error occurred"
                }
              }
            }
          }
        }
      }
    }
  };



  const passwordReset = {
    tags: ["Users"],
    description: "Reset password with token",
    "parameters": [
                    {
                      "name": "token",
                      "in": "path",
                      "required": true,
                      "description": "Reset password token received via email",
                      "schema": {
                        "type": "string"
                      }
                    }
                  ],
             "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "password": {
                      "type": "string",
                      "description": "New password for the user"
                    },
                    confirmPassword:{
                      type:"string",
                      description:"type your new password again"
                    }
                  },
                  "required": ["password" , "confirmPassword"]
                }
              }
            }
          },
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
                  description: "Success message",
                  example: "Password reset successful"
                }
              }
            }
          }
        }
      },
   
      401: {
        description: "Unauthorized",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  description: "Error message",
                  example: "Invalid or expired token"
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
                message: {
                  type: "string",
                  description: "Error message",
                  example: "Server error occurred"
                }
              }
            }
          }
        }
      }
    }
  };

  const getUser = {
    tags: ["Users"],
    description: "get the user by id",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "user id",
        type: "number",
        example: "1",
      },
    ],
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
  }
  
  const userRouteDoc = {
    "/api/user/requestReset": {
      post: requestReset
    },
    "/api/user/resetpassword/{token}": {
        post: passwordReset
      }
   ,
   "/api/user/login": { post: login },
   "/api/user/{id}": { get: getUser }
  };
 
  
  export default userRouteDoc;
  
