

import express from "express";


import productController from "../controllers/productController";
import isLoggedIn from "../middlewares/checklogin";
import uploadImages from "../middlewares/uploadImage";




const produRoute = express.Router();

produRoute.post("/create",isLoggedIn,
uploadImages("images"),
productController.createProduct);
produRoute.get("/searcch",productController.searchProduct);

export default produRoute;
