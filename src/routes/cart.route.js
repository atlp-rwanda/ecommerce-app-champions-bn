import express from "express";
import CartController from "../controllers/cartController";
import { verifyBuyer } from "../middlewares/authenticate";
import updateCartSchema from "../validations/updateCartValidation";
import { validate } from "../middlewares/validate";

const cartRoute = express.Router();

cartRoute.post("/add/:productId", verifyBuyer, CartController.addItem);
cartRoute.put("/updateCart/:productId",verifyBuyer,validate(updateCartSchema),CartController.updateCart);
cartRoute.get("/getAll", verifyBuyer, CartController.getCartItems);
cartRoute.post("/add/:productId",verifyBuyer,CartController.addItem );
cartRoute.delete("/clear-cart",verifyBuyer,CartController.clearCart );
cartRoute.delete("/clear-cart-item/:id",verifyBuyer,CartController.deleteCartItem );

export default cartRoute;
