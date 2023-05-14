const getAllRoles = {
  tags: ["Role"],
  description: "all roles",
  security: [
    {
      token: []
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

const assignRole = {
  tags: ["Role"],
  description: "assign role to the user",
  parameters: [
    {
      name: "id",
      in: "path",
      description: "id of the user",
      type: "string",
      example: "1"
    }
  ],
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
            prevRole: {
              type: "string",
              description: "previous role",
              example: "buyer"
            },
            newRole: {
              type: "string",
              description: "new role",
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

const roleRouteDoc = {
  "/api/role/all": { get: getAllRoles },
  "/api/role/assign-role/{id}": { patch: assignRole },
  "/api/role/create": { post: createRole },
  "/api/role/delete/{id}": { delete: deleteRole }
};

export default roleRouteDoc;
