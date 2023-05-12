import { Router } from "express";
import BuyerController from "../controllers/buyerController";
import { validate } from "../middlewares/validate";
import { buyerSchema, buyerUpSchema } from "../validations/buyerValidationSchema";
import { verifyBuyer,verifyAdmin } from "../middlewares/authenticate";


const buyerRoute = Router();

buyerRoute.post("/signup", validate(buyerSchema), BuyerController.createBuyer);
buyerRoute.get("/all",verifyAdmin, BuyerController.getAllBuyers);
buyerRoute.get("/verifyToken", BuyerController.verifyBuyer);
buyerRoute.get("/oneProfile/:userId", BuyerController.getProfile);
buyerRoute.put("/profile/:userId", validate(buyerUpSchema), verifyBuyer, BuyerController.updateProfile);

export default buyerRoute;
