import { Router } from "express";
import Vendors from "../../controllers/userController";
import vendorSchema from "../../validations/vendorValidation";
import validate from "../../middlewares/validate";

const route = Router();

route.post("/signup", validate(vendorSchema), Vendors.registerVendor);

export default route;
