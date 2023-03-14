import { Router } from "express";
import Buyers from "../controllers/buyerController";

const buyerRoute = Router();

buyerRoute.post("/signup",Buyers.createBuyer);

export default buyerRoute;