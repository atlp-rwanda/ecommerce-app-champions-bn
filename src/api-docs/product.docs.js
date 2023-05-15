
import response from "./response";



const postProduct = {
  tags: ["Product"],
  description: "create a product",
  security: [
    {
      token: []
    }
  ],
  requestBody: {
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          properties: {
            productOwner: {
              type: "string",
              required: true,
              description: "Item owner"
            },
            productName: {
              type: "string",
              required: true,
              description: "Item name"
            },
            productPrice: {
              type: "number",
              required: true,
              description: "Price of the item"
            },
            category: {
              type: "string",
              required: true,
              description: "Category of the item"
            },
            quantity: {
              type: "integer",
              required: true,
              description: "Number of the items"
            },
            expiredDate: {
              type: "date",
              required: true,
              description: "Expiry Date of the item",
              example: "2023-02-30"
            },
            bonus: {
              type: "number",
              required: true,
              description: "Bonus section"
            },
            productImage: {
              type: "array",
              items: {
                type: "string",
                format: "binary",
                required: true,
                minItems: 2
              }
            },
            productDescription: {
              type: "string",
              required: true,
              description: "product description"
            }
          }
        }
      }
    }
  },
  responses: response
};

const getAllProducts = {
  tags: ["Product"],
  summary: "Get all products",
  description: "Retrieves a list of all products.",
  security: [
    {
      token: []
    }
  ],
  responses:response
};
const addToWishlist = {
  tags: ["Product"],
  description: "Add a product to a user's wishlist",
  parameters: [
    {
      name: "productId",
      in: "path",
      description: "ID of the product to add",
      required: true,
      schema: {
        type: "integer",
        example: 1
      }
    }
  ],
  security: [
    {
      token: []
    }
  ],
  responses: response
};

const getAvailableProducts = {
  tags: ["Product"],
  security: [
    {
      token: []
    }
  ],
  summary: "Get available products",
  description: "Retrieves a list of all products.",
  responses:response
};

const searchProduct = {
  tags: ["Product"],
  description: "search a product by name, decription, owner ...",
  parameters: [
    {
      name: "searchParam",
      in: "query",
      description: "the text you want to search",
      type: "string",
      example: "apple"
    }
  ],
  responses: response
};

const getProductById = {
  tags: ["Product"],
  description: "get product from seller collection",
  security: [
    {
      token: []
    }
  ],
  parameters: [
    {
      name: "id",
      in: "path",
      description: "id of product",
      type: "string",
      example: "1"
    }
  ],
  responses: response
};
const updateProduct = {
  tags: ["Product"],
  description: "update product",
  security: [
    {
      token: []
    }
  ],
  parameters: [
    {
      in: "path",
      name: "id",
      description: "id of the product",
      required: true,
      schema: {
        type: "integer",
        format: "number"
      }
    }
  ],
  requestBody: {
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          properties: {
            productOwner: {
              type: "string",
              required: true,
              description: "Item owner"
            },
            productName: {
              type: "string",
              required: true,
              description: "Item name"
            },
            productPrice: {
              type: "number",
              required: true,
              description: "Price of the item"
            },
            quantity: {
              type: "integer",
              required: true,
              description: "Number of the items"
            },
            expiredDate: {
              type: "date",
              required: true,
              description: "Expiry Date of the item",
              example: "2023-02-30"
            },
            bonus: {
              type: "number",
              required: true,
              description: "Bonus section"
            },
            productImage: {
              type: "array",
              items: {
                type: "string",
                format: "binary",
                required: true,
                minItems: 2
              }
            },
            productDescription: {
              type: "string",
              required: true,
              description: "product description"
            }
          }
        }
      }
    }
  },
  responses: response
};

const deleteProduct = {
  tags: ["Product"],
  description: "delete product from seller collection",
  security: [
    {
      token: []
    }
  ],
  parameters: [
    {
      name: "id",
      in: "path",
      description: "id of product",
      type: "string",
      example: "12"
    }
  ],
  responses: response
};

const retrieveProductItems = {
  tags: ["Product"],
  description: "Retrieve all products in a user's wishlist",
  security: [
    {
      token: []
    }
  ],
  responses: response
};


   
  const listProduct = {
    tags: ["Product"],
    description: "list all product from seller collection",
    security: [
      {
        token: [],
      },
    ],
    parameters: [],
    responses: response
  };

  const enableProduct = {
    tags: ["Product"],
    description: "make product available",
    security: [
      {
        token: [],
      },
    ],
    parameters: [
      {
        name: "searchParam",
        in: "query",
        description: "the text you want to search",
        type: "string",
        example: "2"
      }
    ],
    responses: response
  };
  



  const disableProduct = {
    tags: ["Product"],
    description: "make product unavailable",
    security: [
      {
        token: [],
      },
    ],
    parameters: [
      {
        name: "searchParam",
        in: "query",
        description: "the text you want to search",
        type: "string",
        example: "1"
      }
    ],
    responses: response
  };

const getRecommendedProducts = {
  tags: ["Product"],
  description: "get recommended product",
  parameters: [
    {
      name: "searchParam",
      in: "query",
      description: "the text you want to search",
      type: "string",
      example: "mango"
    }
  ],

  responses: response
};

const getExpiredProducts = {
  tags: ["Product"],
  description: "get the expired products and unlist them from the available products",
  responses:response
};

const productRouteDoc = {
  "/api/product/create": {
    post: postProduct
  },
  "/api/product/update/{id}": {
    patch: updateProduct
  },
  "/api/product/searcch": {
    get: searchProduct
  },
  "/api/product/getAll": {
    get: getAllProducts
  },
  "/api/product/getAvailable": {
    get: getAvailableProducts
  },
  "/api/product/getOne/{id}": {
    get: getProductById
  },
  "/api/product/delete/{id}": {
    delete: deleteProduct
  },
  "/api/product/addToWishlist/{productId}": {
    post: addToWishlist
  },
  "/api/product/retrieveWishlistItems": {
    get: retrieveProductItems
  },
  "/api/product/get-seller-products":{get: listProduct},
   
  "/api/product/disable": {
      get: disableProduct
    },
    "/api/product/enable": {
      get: enableProduct
    },
  "/api/product/recommended": {
    get: getRecommendedProducts
  },
  "/api/product/checkExpired": {
    get: getExpiredProducts
  }
};
  
  export default productRouteDoc;
