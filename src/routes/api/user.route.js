import { Router } from "express";
import Users from "../../controllers/userController";
import vendorValidation from "../../validations/vendorValidation";
import Buyers from "../../controllers/buyerController";
import buyerSchema from "../../validations/buyerValidationSchema";
import validate from "../../middlewares/validate";


const route = Router();

route.post("/signup", vendorValidation, Users);
route.post("/buyerSignup",validate(buyerSchema),Buyers.createBuyer);

export default route;
