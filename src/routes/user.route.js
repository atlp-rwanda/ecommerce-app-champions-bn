import { Router } from "express";

import Vendors from "../controllers/userController";
import { validate } from "../middlewares/validate";
import { vendorSchema } from "../validations/vendorValidation";

const route = Router();

route.post("/signup", validate(vendorSchema), Vendors.registerVendor);
route.get("/:id",Vendors.getUser);

export default route;
