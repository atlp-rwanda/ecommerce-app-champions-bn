import { Router } from "express";
import Users from "../../controllers/userController";
import vendorValidation from "../../validations/vendorValidation";


const route = Router();

route.post("/signup", vendorValidation, Users);

export default route;
