import express, { Router } from "express";
import vendorRoute from "./api/vendor.route";

const routes = express.Router();

routes.use("/", vendorRoute);

export default routes;
