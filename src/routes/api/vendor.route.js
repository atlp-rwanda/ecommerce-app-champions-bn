import { Router } from "express";
import VendorController from "../../controllers/vendorController";
import vendorValidation from "../../validations/vendorValidation";
import vendorVerify from "../../middlewares/verifyVendor";

const vendorRoute = Router();

vendorRoute.post("/vendor", vendorValidation, VendorController.createVendor);

export default vendorRoute;
