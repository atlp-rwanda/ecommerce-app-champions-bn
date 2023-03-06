import express, { Router } from "express";
import route from "./api/user.route";

const routes = express.Router();

routes.use("/", route);

export default routes;
