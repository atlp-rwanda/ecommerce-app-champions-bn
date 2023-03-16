import { Router } from "express";
<<<<<<< HEAD
import Users from "../../controllers/userController";
import vendorValidation from "../../validations/vendorValidation";
import Buyers from "../../controllers/buyerController";
import buyerSchema from "../../validations/buyerValidationSchema";
=======
import Vendors from "../../controllers/userController";
import vendorSchema from "../../validations/vendorValidation";
>>>>>>> aa00130 (ft-register-vendor:)
import validate from "../../middlewares/validate";

const route = Router();

<<<<<<< HEAD
route.post("/signup", vendorValidation, Users);
route.post("/buyerSignup",validate(buyerSchema),Buyers.createBuyer);
=======
route.post("/signup", validate(vendorSchema), Vendors.registerVendor);
>>>>>>> aa00130 (ft-register-vendor:)

export default route;
