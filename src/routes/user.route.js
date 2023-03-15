import { Router } from "express";
import UserController from "../controllers/userController";
import { validate } from "../middlewares/validate";
import { vendorSignup,vendorLogin} from "../validations/vendorSchema";
import isLoggedIn from "../middlewares/checklogin";


const userRoute = Router();

userRoute.post("/signup", validate(vendorSignup), UserController.vendorSignup);
userRoute.post("/login",validate(vendorLogin),UserController.signin);
userRoute.get("/logout",isLoggedIn,UserController.logout);

export default userRoute;
