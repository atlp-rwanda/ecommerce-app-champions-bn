import express, { Router } from "express";
import route from "./api/user.route";
import roleRoute from "./api/role.route";
import permissionRoute from "./api/permission.route";
import rolePermission from "./api/rolePermission.route";

const routes = express.Router();

routes.use("/", route);
routes.use("/" , roleRoute)
routes.use("/" , permissionRoute)
routes.use("/" , rolePermission)

export default routes;
