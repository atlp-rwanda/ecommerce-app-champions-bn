const createCouponCode = {
    tags: ["Coupon"],
    description: "create Coupon code",
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
                productId: {
                type: "number",
                description: "product id",
                example: "1"
              },
              discount: {
                type: "number",
                description: "discount on the product",
                example: "10"
              },
              expirationDate: {
                type: "date",
                description: "date of expiration",
                example: "2023-04-25"
              },
              maxUsage: {
                type: "number",
                description: "maximum usage",
                example: "1"
              },
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

  const appyCoupon ={
    tags: ["Coupon"],
    description: "create Coupon code",
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
              couponCode: {
                type: "string",
                description: "coupon code id",
                example: "TzhN5V5h6"
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

  const getMyCoupons = {
    tags: ["Coupon"],
    description: "get vendor coupons",
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
  
  const deleteCoupon = {
    tags: ["Coupon"],
    description: "delete coupon code",
    security: [
      {
        token: []
      }
    ],
    parameters: [
      {
        name: "id",
        in: "path",
        description: "id of coupon code",
        type: "number",
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

  const updateCoupon = {
    tags: ["Coupon"],
    description: "update coupon code",
    security: [
      {
        token: []
      }
    ],
    parameters: [
      {
        name: "id",
        in: "path",
        description: "id of coupon code",
        type: "number",
        example: "1"
      }
    ],
    requestBody: {
      content: {
        "Application/json": {
          schema: {
            type: "object",
            properties: {
              discount: {
                type: "string",
                description: "discount",
                example: "10"
              },
              maxUsage: {
                type: "number",
                description: "maximum usage",
                example: "3"
              },
              expirationDate: {
                type: "date",
                description: "expiration date",
                example: "2023-04-25"
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
  
  const couponCodeRouteDoc = {
    "/api/coupon/generate": { post: createCouponCode },
    "/api/coupon/my-coupons":{get:getMyCoupons},
    "/api/coupon/apply-coupon":{post:appyCoupon},
    "/api/coupon/delete/{id}": { delete: deleteCoupon },
    "/api/coupon/update/{id}": { patch: updateCoupon }
  };
  
  export default couponCodeRouteDoc;
  