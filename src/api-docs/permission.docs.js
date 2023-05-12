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
            },
            permissionFor:{
              type: "string",
              description: "the role permission will be assigned to",
              example: "vendor",
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

const getAllVendorPermissions = {
  tags: ["Permission"],
  description: "get all vendor permissions",
  security: [
    {
      token: [],
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
};

const enableOrDisablePermission = {
  tags: ["Permission"],
  description: "enable or disable permission",
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
  requestBody: {
    content: {
      "Application/json": {
        schema: {
          type: "object",
          properties: {
            permissionStatus: {
              type: "boolean",
              description: "permission status",
              example: "false"
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

const permissionRouteDoc = {
  "/api/permission/create": { post: createPermission },
  "/api/permission/enable-or-disable-permission/{id}": { patch: enableOrDisablePermission },
  "/api/permission/delete/{id}": { delete: deletePermission },
  "/api/permission/vendor-permissions": { get: getAllVendorPermissions }
};

export default permissionRouteDoc;
