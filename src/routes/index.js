import express from "express";
import userRoute from "./user.route";
import roleRoute from "./role.route";

const indexRouter = express.Router();

indexRouter.use("/api/vendor", userRoute);
indexRouter.use("/api/role",roleRoute);

export default indexRouter;
