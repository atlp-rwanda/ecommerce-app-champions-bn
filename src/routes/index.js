import express from "express";
import route from "./user.route";
import roleRoute from "./role.route";
import permissionRoute from "./permission.route";
import buyerRoute from "./buyer.route";

const routes = express.Router();

routes.use("/api/vendor", route);
routes.use("/api/role" , roleRoute);
routes.use("/api/permission" , permissionRoute);
route.use("/api/buyer",buyerRoute);

export default routes;
