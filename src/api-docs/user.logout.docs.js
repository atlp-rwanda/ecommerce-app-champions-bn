
module.exports={
    "/api/user/logout": {
        "get": {
          "tags": ["Users"],
          "description": "Logout a user from app",
          "responses": {
            "200": {
              "description": "User logged out successfully"
            },
            "400": {
              "description": "Bad request"
            },
            "500": {
              "description": "Internal server error"
            }
          }
        }
      } 
};