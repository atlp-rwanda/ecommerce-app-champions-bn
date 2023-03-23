import passport from "passport";

export default {
  "/auth/google": {
    get: {
      security: [
        {
          googleAuth: ["https://www.googleapis.com/auth/userinfo.profile"]
        }
      ],
      summary: "Authenticate with Google",
      description:
        "This endpoint initiates the authentication flow with Google.",
      responses: {
        200: {
          description: "Redirects to the Google authentication page.",
          headers: {
            Location: {
              schema: {
                type: "string",
                format: "url"
              }
            }
          }
        }
      },
      tags: ["Users"],
      parameters: [],
      requestBody: {},
      middleware: [
        passport.authenticate("google", {
          session: false,
          failureRedirect: "http://localhost:5000/auth/google/redirect",
          scope: ["profile", "email"]
        })
      ],
      "x-swagger-router-controller": "Oauthroute",
      operationId: "googleOauth"
    }
  }
  
};
