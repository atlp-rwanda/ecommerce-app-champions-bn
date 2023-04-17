import express from "express";
import SalesController from "../controllers/salesController";
import { verifyVendor } from "../middlewares/authenticate";

const salesRoute = express.Router();

salesRoute.get("/getSales", verifyVendor, SalesController.getAllSales);

export default salesRoute;
