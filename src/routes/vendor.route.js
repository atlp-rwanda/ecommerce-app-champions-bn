import express from "express";
import VendorController from "../controllers/vendorController";
import { vendorSchema, vendorUpSchema } from "../validations/vendorValidation";
import { validate } from "../middlewares/validate";
import isLoggedIn from "../middlewares/checklogin";

const vendorRoute = express.Router();

vendorRoute.post("/signup", validate(vendorSchema), VendorController.registerVendor);
vendorRoute.put("/profile/:userId", isLoggedIn, validate(vendorUpSchema), VendorController.updateProfile);
vendorRoute.get("/oneProfile/:userId", VendorController.getProfile);
export default vendorRoute;
