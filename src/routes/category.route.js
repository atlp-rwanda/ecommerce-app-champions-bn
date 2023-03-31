import express from "express";
import ProductController from "../controllers/productController";
import { categorySchema } from "../validations/validateProduct";
import { validate } from "../middlewares/validate";
import {verifyVendor} from "../middlewares/authenticate";
import { categoryExistAlready } from "../middlewares/productExists";

const categoryRoute = express.Router();

categoryRoute.post("/create",verifyVendor,categoryExistAlready,validate(categorySchema),ProductController.categoryController
);

export default categoryRoute;
