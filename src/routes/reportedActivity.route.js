import express from "express";
import ReportedActivityController from "../controllers/reportedActivityController";

const reportedRoute = express.Router();

reportedRoute.post("/create",ReportedActivityController.reportIllegalActivity);
reportedRoute.get("/all",ReportedActivityController.reportedActivities);

export default reportedRoute;