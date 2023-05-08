import express from "express";
import VendorController from "../controllers/vendorController";
import { vendorSchema, vendorUpSchema } from "../validations/vendorValidation";
import { validate } from "../middlewares/validate";
import isLoggedIn from "../middlewares/checklogin";
import { verifyAdmin,verifyVendor } from "../middlewares/authenticate";

const vendorRoute = express.Router();

vendorRoute.post("/signup", validate(vendorSchema) ,VendorController.registerVendor);
vendorRoute.put("/profile/:userId", verifyVendor, validate(vendorUpSchema), VendorController.updateProfile);
vendorRoute.get("/all", VendorController.getAllVendors);
vendorRoute.get("/:id", VendorController.getAllVendors);
vendorRoute.get("/oneProfile/:userId", VendorController.getProfile);
vendorRoute.post("/disable/:id",verifyAdmin, VendorController.disableVendorAccount);
vendorRoute.put("/enable/:id",verifyAdmin, VendorController.enableVendorAccount);

export default vendorRoute;
