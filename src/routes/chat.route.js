
import express from "express";
import isLoggedIn from "../middlewares/checklogin";
import liveChartController from "../controllers/liveChartController";





const chatRoute = express.Router();
chatRoute.get("/get-all-chat",isLoggedIn,liveChartController.getChats);


export default chatRoute;
