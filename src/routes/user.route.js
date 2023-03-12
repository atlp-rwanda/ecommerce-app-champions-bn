import { Router } from "express";
import UserController from "../controllers/userController";
import { validate } from "../middlewares/validate";
import { vendorSignup,vendorLogin } from "../validations/vendorSchema";


const userRoute = Router();

userRoute.post("/signup", validate(vendorSignup), UserController.vendorSignup);
userRoute.post("/login",validate(vendorLogin),UserController.signin);

export default userRoute;
