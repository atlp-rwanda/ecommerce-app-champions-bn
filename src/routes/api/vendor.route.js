import {Router} from "express";
import vendorRegister from "../../controllers/vendorController";
import vendorValidation from "../../validations/vendorValidation";
import vendorVerify from "../../middlewares/verifyVendor";

const vendorRoute = Router();

vendorRoute.post("/vendor", vendorValidation, vendorVerify,vendorRegister);

export default vendorRoute;