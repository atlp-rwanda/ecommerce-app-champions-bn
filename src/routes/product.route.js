

import express from "express";


import productController from "../controllers/productController";
import isLoggedIn from "../middlewares/checklogin";
import uploadImages from "../middlewares/uploadImage";




const produRoute = express.Router();

produRoute.post("/create",
uploadImages("images"),isLoggedIn,
productController.createProduct);
produRoute.get("/searcch",productController.searchProduct);


produRoute.delete("/delete/:id",isLoggedIn,
productController.deleteProduct);

export default produRoute;
