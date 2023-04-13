import {Router} from "express";
import {getNotifications,deleteNotifications} from "../controllers/notificationController";
import { verifyVendor } from "../middlewares/authenticate";

const notificationRouter= Router();

notificationRouter.get("/getNotifications",verifyVendor,getNotifications);
notificationRouter.delete("/deleteNotifications/:id",verifyVendor,deleteNotifications);


export default notificationRouter;