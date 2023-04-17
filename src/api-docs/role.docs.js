const createRole = {
  tags: ["Role"],
  description: "create role",
  security: [
    {
      token: []
    }
  ],
  requestBody: {
    content: {
      "Application/json": {
        schema: {
          type: "object",
          properties: {
            roleName: {
              type: "string",
              description: "role",
              example: "vendor"
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

const deleteRole = {
  tags: ["Role"],
  description: "delete role",
  security: [
    {
      token: []
    }
  ],
  parameters: [
    {
      name: "id",
      in: "path",
      description: "id of role",
      type: "string",
      example: "1"
    }
  ],
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

const roleRouteDoc = {
  "/api/role/create": { post: createRole },
  "/api/role/delete/{id}": { delete: deleteRole }
};

export default roleRouteDoc;
