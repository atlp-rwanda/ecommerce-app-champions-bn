import { Router } from "express";
import Buyers from "../controllers/buyerController";
import { validate } from "../middlewares/validate";
import buyerSchema from "../validations/buyerValidationSchema";

const buyerRoute = Router();

buyerRoute.post("/signup",validate(buyerSchema),Buyers.createBuyer);

export default buyerRoute;