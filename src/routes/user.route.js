import express from "express";

import UserController from "../controllers/userController";
import isLoggedIn from "../middlewares/checklogin";

const userRoute = express.Router();
userRoute.post("/login", UserController.signin);
userRoute.get("/logout", isLoggedIn, UserController.logout);
userRoute.post("/validate", UserController.Validate);
export default userRoute;
