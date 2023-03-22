

import express from "express";


import productController from "../controllers/productController";
import isLoggedIn from "../middlewares/checklogin";
import uploadImages from "../middlewares/uploadImage";
import { productExistAlready } from "../middlewares/productExists";
import { productSchema } from "../validations/validateProduct";
import { validate } from "../middlewares/validate";


const productRoute = express.Router();

productRoute.post(
  "/create",
  isLoggedIn,
  uploadImages("productImage"),
  validate(productSchema),
  productExistAlready,
  productController.createProduct
);


export default productRoute;