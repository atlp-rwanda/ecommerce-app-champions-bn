import express from "express";
import ProductController from "../controllers/productController";
import isLoggedIn from "../middlewares/checklogin";
import uploadImages from "../middlewares/uploadImage";
import { productExistAlready,IsProductExist } from "../middlewares/productExists";
import { productSchema, updateSchema } from "../validations/validateProduct";
import { validate } from "../middlewares/validate";
import { verifyBuyer, verifyVendor } from "../middlewares/authenticate";

const productRoute = express.Router();

productRoute.get("/searcch", ProductController.searchProduct);
productRoute.get("/getAll",verifyVendor, ProductController.getAllProducts);
productRoute.get("/getAvailable",ProductController.getAvailableProduct);
productRoute.get("/getOne/:id", isLoggedIn, ProductController.getProductById);
productRoute.post("/addToWishlist/:productId",verifyBuyer,ProductController.addToWishlist);
productRoute.get("/retrieveWishlistItems",verifyBuyer,ProductController.retrieveProductItems);
productRoute.get("/recommended", ProductController.getRecommendedProducts);
productRoute.get("/checkExpired", ProductController.checkExpiredProducts);
productRoute.post("/create",verifyVendor,uploadImages("productImage"),validate(productSchema),productExistAlready,ProductController.createProduct);
productRoute.patch("/update/:id",verifyVendor,uploadImages("productImage"),IsProductExist,validate(updateSchema),ProductController.updateProduct);
productRoute.delete("/delete/:id",verifyVendor,ProductController.deleteProduct);
productRoute.get("/get-seller-products",verifyVendor,ProductController.availableProductsInCollection);
productRoute.get("/disable",verifyVendor,ProductController.disableProduct);
productRoute.get("/enable",verifyVendor,ProductController.enableProduct);
export default productRoute;
