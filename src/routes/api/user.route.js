import { Router } from "express";
import Users from "../../controllers/userController";
import vendorValidation from "../../validations/vendorValidation";
import Buyers from "../../controllers/buyerController";
import buyerSchema from "../../validations/buyerValidationSchema";
import Vendors from "../../controllers/userController";
import vendorSchema from "../../validations/vendorValidation";
import validate from "../../middlewares/validate";

const route = Router();

route.post("/signup", validate(vendorSchema), Vendors.registerVendor);

export default route;
