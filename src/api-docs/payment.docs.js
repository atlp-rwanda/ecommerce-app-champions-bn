const postCheckOut = {
  tags: ["Payments"],
  description: "payment checkout",
  security: [
    {
      token: []
    }
  ],
  responses: {
    200: {
      description: "Success"
    },
    401: {
      description: "Unauthorized"
    },
    500: {
      description: "internal server error"
    }
  }
};

const getAllSales = {
  tags: ["Payments"],
  description: "get all product sales",
  security: [
    {
      token: []
    }
  ],
  responses: {
    200: {
      description: "Success"
    },
    401: {
      description: "Unauthorized"
    },
    500: {
      description: "internal server error"
    }
  }
};

const getAllOrders = {
  tags: ["Payments"],
  description: "get all product orders",
  security: [
    {
      token: []
    }
  ],
  responses: {
    200: {
      description: "Success"
    },
    401: {
      description: "Unauthorized"
    },
    500: {
      description: "internal server error"
    }
  }
};

const paymentRouteDoc = {
  "/api/payment/checkout": {
    post: postCheckOut
  },
  "/api/sales/getSales": {
    get: getAllSales
  },
  "/api/orders/getOrders": {
    get: getAllOrders
  }
};

export default paymentRouteDoc;
