import express from "express";
import CouponCodeController from "../controllers/couponCodeController";
import { verifyBuyer, verifyVendor} from "../middlewares/authenticate";

const couponCodeRoute = express.Router();

couponCodeRoute.post("/generate",verifyVendor,CouponCodeController.createCouponCode);
couponCodeRoute.get("/my-coupons",verifyVendor,CouponCodeController.getVendorCoupons);
couponCodeRoute.post("/apply-coupon",verifyBuyer,CouponCodeController.applyCoupons);
couponCodeRoute.delete("/delete/:id",verifyVendor,CouponCodeController.deleteCoupon);
couponCodeRoute.patch("/update/:id",verifyVendor,CouponCodeController.updateCoupon);

export default couponCodeRoute;