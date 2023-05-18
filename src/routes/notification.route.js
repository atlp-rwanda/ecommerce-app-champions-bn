import { Router } from "express";
import {
  getNotifications,
  getBuyerNotifications,
  deleteNotifications,
  markAllNotificationsAsRead,
  markOneNotification,
  markOneBuyerNotification
} from "../controllers/notificationController";
import { verifyBuyer, verifyVendor } from "../middlewares/authenticate";
import isLoggedIn from "../middlewares/checklogin";

const notificationRouter = Router();

notificationRouter.get("/getNotifications", verifyVendor, getNotifications);
notificationRouter.delete(
  "/deleteNotifications/:id",
  verifyVendor,
  deleteNotifications
);
notificationRouter.patch("/markAll", isLoggedIn, markAllNotificationsAsRead);
notificationRouter.patch("/markOne", markOneNotification);
notificationRouter.get(
  "/getBuyerNotifications",
  verifyBuyer,
  getBuyerNotifications
);
notificationRouter.patch("/markOneBuyer", markOneBuyerNotification);

export default notificationRouter;
