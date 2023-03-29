import express from "express";
import productController from "../controllers/productController";
import isLoggedIn from "../middlewares/checklogin";

const categoryRoute = express.Router();

categoryRoute.post("/create",isLoggedIn,productController.categoryController);

export default categoryRoute;
