import express from "express";
import ReportedActivityController from "../controllers/reportedActivityController";
import { verifyBuyer } from "../middlewares/authenticate";

const reportedRoute = express.Router();

reportedRoute.post("/create",verifyBuyer,ReportedActivityController.reportIllegalActivity);
reportedRoute.get("/all",ReportedActivityController.reportedActivities);

export default reportedRoute;