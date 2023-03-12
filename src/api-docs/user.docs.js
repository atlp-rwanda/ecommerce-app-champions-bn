/* eslint-disable */

export const userRouteDocs = {
    "/api/vendor/signup":{
        post:{
            tags:['User'],
            description:"Vendor signup",
            requestBody:{
                content:{
                    "application/json":{
                        schema: {
                              type: "object",
                              properties: {
                                firstName: {
                                  type: "string",
                                  required: true,
                                  description: "first name"
                                },
                                lastName: {
                                  type: "string",
                                  required: true,
                                  description: "last name"
                                },
                                email: {
                                  type: "string",
                                  required: true,
                                  description: "email@gmail.com"
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
    },

    "/api/vendor/login":{
        post:{
            tags:['User'],
            description:"User Login",
            requestBody:{
                content:{
                    "application/json":{
                        schema: {
                              type: "object",
                              properties: {
                                email: {
                                  type: "string",
                                  description: "email of the user",
                                  example:"admin@gmail.com"
                                },
                                password:{
                                    type:"string",
                                    description: "password of user",
                                    example:"test@1234"
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
    }
}