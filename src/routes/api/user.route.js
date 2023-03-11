import { Router } from "express";
import vendorVerify from "../../middlewares/verifyVendor";
import Users from "../../controllers/userController";
import vendorValidation from "../../validations/vendorValidation";


const route = Router();

route.post("/signup", vendorVerify,vendorValidation, Users);

export default route;
