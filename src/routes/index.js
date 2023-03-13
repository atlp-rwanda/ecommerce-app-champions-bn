import express, { Router } from "express";
import route from "./api/user.route";
import router from "./api/resetPassword.route";

const routes = express.Router();

routes.use("/", route);
routes.use("/", router);

export default routes;
