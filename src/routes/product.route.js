import express from "express";
import ProductController from "../controllers/productController";
import isLoggedIn from "../middlewares/checklogin";
import uploadImages from "../middlewares/uploadImage";

const productRoute = express.Router();

productRoute.get("/searcch",ProductController.searchProduct);

productRoute.post("/create",isLoggedIn,
uploadImages("images"),
ProductController.createProduct);
productRoute.get("/getAll",ProductController.venderGetAllProducts);

export default productRoute;













