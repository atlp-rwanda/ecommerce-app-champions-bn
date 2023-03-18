import express from "express";

import { validate } from "../middlewares/validate";
import { vendorSchema } from "../validations/vendorValidation";
import UserController from "../controllers/userController";

const userRoute = express.Router();

userRoute.post("/login", UserController.signin);

export default userRoute;
