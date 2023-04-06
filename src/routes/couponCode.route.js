import express from "express";
import CouponCodeController from "../controllers/couponCodeController";
import { verifyVendor} from "../middlewares/authenticate";

const couponCodeRoute = express.Router();

couponCodeRoute.post("/generate",verifyVendor,CouponCodeController.createCouponCode);

export default couponCodeRoute;