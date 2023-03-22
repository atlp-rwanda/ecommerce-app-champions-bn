import express from "express";

import { validate } from "../middlewares/validate";
import { vendorSchema } from "../validations/vendorValidation";
import UserController from "../controllers/userController";
import isLoggedIn from "../middlewares/checklogin";


const userRoute = express.Router();


userRoute.post("/login", UserController.signin);
userRoute.get("/logout",isLoggedIn,UserController.logout);

export default userRoute;