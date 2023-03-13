import express, { Router } from "express";
import route from "./api/user.route";
import profileRoute from "./api/profile.route";

const routes = express.Router();

routes.use("/", route);
routes.use("/user", profileRoute);

export default routes;
