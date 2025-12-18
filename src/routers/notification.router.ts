import { Router } from "express";

import {
  deleteNotificationController,
  getNotificationsController,
} from "../controllers/notification.controllers.js";
import authenticate from "../middlewares/authenticate.js";

const notificationRouter: Router = Router();

notificationRouter.get("/", authenticate, getNotificationsController);
notificationRouter.delete(
  "/:notificationId",
  authenticate,
  deleteNotificationController,
);

export default notificationRouter;
