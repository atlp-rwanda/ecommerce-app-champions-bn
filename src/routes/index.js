import express from "express";
import roleRoute from "./role.route";
import permissionRoute from "./permission.route";
import buyerRoute from "./buyer.route";
import router from "./resetPassword.route";
import vendorRoute from "./vendor.route";
import userRoute from "./user.route";
import Oauthroute from "./Oauthroute";
import productRoute from "./product.route";
import categoryRoute from "./category.route";

const indexRouter = express.Router();

indexRouter.use("/api/vendor", vendorRoute);
indexRouter.use("/api/role" , roleRoute);
indexRouter.use("/api/permission" , permissionRoute);
indexRouter.use("/api/buyer",buyerRoute);
indexRouter.use("/api/user",userRoute);
indexRouter.use("/api/user",router);
indexRouter.use("/",Oauthroute);
indexRouter.use("/api/product",productRoute);






<<<<<<< HEAD
indexRouter.use("/api/product",productRoute);
=======
indexRouter.use("/api/product",produRoute);
>>>>>>> c496c56 (ft(list-items): products)
indexRouter.use("/api/category",categoryRoute);

export default indexRouter;
