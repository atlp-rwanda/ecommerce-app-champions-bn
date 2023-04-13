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

const paymentRouteDoc = {
  "/api/payment/checkout": {
    post: postCheckOut
  },
};

export default paymentRouteDoc;
