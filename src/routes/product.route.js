import express from "express";
import ProductController from "../controllers/productController";

const productRoute = express.Router();

productRoute.get("/searcch",ProductController.searchProduct);

export default productRoute;