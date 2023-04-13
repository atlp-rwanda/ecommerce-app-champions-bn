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
import categoryRoute from "./category.route";
import reviewRouter from "./review.route";
import cartRoute from "./cart.route";
import paymentRoute from "./payment.route";
import notificationRouter from "./notification.route";

const indexRouter = express.Router();

indexRouter.use("/api/vendor", vendorRoute);
indexRouter.use("/api/role", roleRoute);
indexRouter.use("/api/permission", permissionRoute);
indexRouter.use("/api/buyer", buyerRoute);
indexRouter.use("/api/user", userRoute);
indexRouter.use("/api/user", router);
indexRouter.use("/", Oauthroute);
indexRouter.use("/api/report", reportedRoute);
indexRouter.use("/api/category", categoryRoute);
indexRouter.use("/api/product", productRoute);
indexRouter.use("/api/review",reviewRouter);
indexRouter.use("/api/cart", cartRoute);
indexRouter.use("/api/payment", paymentRoute);
indexRouter.use("/api/notification",notificationRouter);

export default indexRouter;
