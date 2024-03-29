import express from "express";

import UserController from "../controllers/userController";
import isLoggedIn from "../middlewares/checklogin";

const userRoute = express.Router();
userRoute.post("/login", UserController.signin);
userRoute.get("/logout", isLoggedIn, UserController.logout);
userRoute.get("/:id", UserController.getUser);
userRoute.post("/validate/:token", UserController.Validate);
userRoute.get("/single",isLoggedIn,UserController.getUserProfile);

export default userRoute;
