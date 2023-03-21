import { Router } from "express";

import BuyerController from "../controllers/buyerController";

import { validate } from "../middlewares/validate";
import { buyerSchema } from "../validations/buyerValidationSchema";

const buyerRoute = Router();

buyerRoute.post("/signup",validate(buyerSchema),BuyerController.createBuyer);

export default buyerRoute;
