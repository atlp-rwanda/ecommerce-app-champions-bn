const createPermission = {
  tags: ["Permission"],
  description: "create permission",
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
            permissionName: {
              type: "string",
              description: "permission",
              example: "vendor create-product"
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

const deletePermission = {
  tags: ["Permission"],
  description: "delete permission",
  security: [
    {
      token: []
    }
  ],
  parameters: [
    {
      name: "id",
      in: "path",
      description: "id of permission",
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

const permissionRouteDoc = {
  "/api/permission/create": { post: createPermission },
  "/api/permission/delete/{id}": { delete: deletePermission }
};

export default permissionRouteDoc;
