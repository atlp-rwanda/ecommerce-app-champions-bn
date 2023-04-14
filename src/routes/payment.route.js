import express from "express";
import PaymentController from "../controllers/paymentController";
import { verifyBuyer } from "../middlewares/authenticate";
import buyerHasCart from "../middlewares/buyerHasCart";

const paymentRoute = express.Router();

paymentRoute.post("/checkout", verifyBuyer, buyerHasCart, PaymentController.paymentCheckout);


export default paymentRoute;