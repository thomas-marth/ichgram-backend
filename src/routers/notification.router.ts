import { Router } from "express";

import { getNotificationsController } from "../controllers/notification.controllers.js";
import authenticate from "../middlewares/authenticate.js";

const notificationRouter: Router = Router();

notificationRouter.get("/", authenticate, getNotificationsController);

export default notificationRouter;
