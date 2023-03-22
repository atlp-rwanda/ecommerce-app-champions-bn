import express from "express";

import productController from "../controllers/productController";
import isLoggedIn from "../middlewares/checklogin";
import uploadImages from "../middlewares/uploadImage";


const produRoute = express.Router();

produRoute.post("/create",
uploadImages("images"),
isLoggedIn, productController.createProduct);
produRoute.get("/searcch",productController.searchProduct);
produRoute.get("/getAll",isLoggedIn,productController.getAllProducts);
produRoute.get("/getAvailable",isLoggedIn,productController.getAvailableProduct);

produRoute.delete("/delete/:id",isLoggedIn,
productController.deleteProduct);
produRoute.get("/getOne/:id",isLoggedIn, productController.getProductById);




produRoute.post("/create",isLoggedIn,
uploadImages("images"),
productController.createProduct);

export default produRoute;
