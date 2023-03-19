import express from "express";
import VendorController from "../controllers/vendorController";
import { vendorSchema } from "../validations/vendorValidation";
import { validate } from "../middlewares/validate";

const vendorRoute = express.Router();

vendorRoute.post("/signup", validate(vendorSchema), VendorController.registerVendor);

export default vendorRoute