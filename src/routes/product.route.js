import express from "express";
import ProductController from "../controllers/productController";
import isLoggedIn from "../middlewares/checklogin";
import uploadImages from "../middlewares/uploadImage";
import { productExistAlready } from "../middlewares/productExists";
import { verifyVendor, verifyBuyer } from "../middlewares/authenticate";
import { productSchema } from "../validations/validateProduct";
import { validate } from "../middlewares/validate";

const productRoute = express.Router();

productRoute.get("/searcch", ProductController.searchProduct);
productRoute.get("/getAll", isLoggedIn, ProductController.getAllProducts);
productRoute.get("/getAvailable",isLoggedIn,ProductController.getAvailableProduct);
productRoute.get("/getOne/:id", isLoggedIn, ProductController.getProductById);
productRoute.post("/addToWishlist/:productId",verifyBuyer,ProductController.addToWishlist);
productRoute.get("/retrieveWishlistItems",verifyBuyer,ProductController.retrieveProductItems);
productRoute.post("/create",uploadImages("productImage"),verifyVendor,validate(productSchema),productExistAlready,ProductController.createProduct);

export default productRoute;
