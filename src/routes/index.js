import express from "express";
import roleRoute from "./role.route";
import permissionRoute from "./permission.route";
import buyerRoute from "./buyer.route";
import vendorRoute from "./vendor.route";

import userRoute from "./user.route";

const indexRouter = express.Router();

indexRouter.use("/api/vendor", vendorRoute);
indexRouter.use("/api/role" , roleRoute);
indexRouter.use("/api/permission" , permissionRoute);
indexRouter.use("/api/buyer",buyerRoute);
indexRouter.use("/api/user",userRoute);

export default indexRouter;
