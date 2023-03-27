import express from "express";
import productController from "../controllers/productController";
import isLoggedIn from "../middlewares/checklogin";
import { categorySchema } from "../validations/validateProduct";
import { validate } from "../middlewares/validate";

const categoryRoute = express.Router();

categoryRoute.post(
  "/create",
  validate(categorySchema),
  isLoggedIn,
  productController.categoryController
);

export default categoryRoute;
