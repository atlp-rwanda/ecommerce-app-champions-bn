import express from "express";
import productController from "../controllers/productController";
import { categorySchema } from "../validations/validateProduct";
import { validate } from "../middlewares/validate";
import {verifyVendor} from "../middlewares/authenticate";
import { categoryExistAlready } from "../middlewares/productExists";

const categoryRoute = express.Router();

categoryRoute.post(
  "/create",
  verifyVendor,categoryExistAlready,
  productController.categoryController
);

export default categoryRoute;
