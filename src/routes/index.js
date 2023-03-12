import express from "express";
import userRoute from "./user.route";

const indexRouter = express.Router();

indexRouter.use("/api/vendor", userRoute);

export default indexRouter;
