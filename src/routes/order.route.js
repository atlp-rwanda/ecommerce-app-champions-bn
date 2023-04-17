import express from "express";
import OrdersController from "../controllers/orderController";
import { verifyBuyer } from "../middlewares/authenticate";

const ordersRoute = express.Router();

ordersRoute.get("/getOrders", verifyBuyer, OrdersController.getAllOrders);

export default ordersRoute;
