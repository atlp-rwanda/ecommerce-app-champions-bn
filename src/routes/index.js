import express from "express";
import roleRoute from "./role.route";
import permissionRoute from "./permission.route";
import buyerRoute from "./buyer.route";
import vendorRoute from "./vendor.route";

import userRoute from "./user.route";
import router from "./api/resetPassword.route";
import route from "./api/user.route";



const indexRouter = express.Router();

indexRouter.use("/api/vendor", vendorRoute);
indexRouter.use("/api/role" , roleRoute);
indexRouter.use("/api/permission" , permissionRoute);
indexRouter.use("/api/buyer",buyerRoute);
indexRouter.use("/api/user",userRoute);
indexRouter.use("/", router);


export default indexRouter;
