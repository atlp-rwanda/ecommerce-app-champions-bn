import express from "express";
import roleRoute from "./role.route";
import permissionRoute from "./permission.route";
import buyerRoute from "./buyer.route";
import router from "./resetPassword.route";
import vendorRoute from "./vendor.route";
import userRoute from "./user.route";
import Oauthroute from "./Oauthroute";
import reportedRoute from "./reportedActivity.route";
import productRoute from "./product.route";

const indexRouter = express.Router();

indexRouter.use("/api/vendor", vendorRoute);
indexRouter.use("/api/role", roleRoute);
indexRouter.use("/api/permission", permissionRoute);
indexRouter.use("/api/buyer", buyerRoute);
indexRouter.use("/api/user", userRoute);
indexRouter.use("/api/user", router);
indexRouter.use("/", Oauthroute);
indexRouter.use("/api/report",reportedRoute);
indexRouter.use("/api/product",productRoute);








export default indexRouter;
