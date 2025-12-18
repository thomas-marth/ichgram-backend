import { Router } from "express";
import { deleteNotificationController, getNotificationsController, } from "../controllers/notification.controllers.js";
import authenticate from "../middlewares/authenticate.js";
const notificationRouter = Router();
notificationRouter.get("/", authenticate, getNotificationsController);
notificationRouter.delete("/:notificationId", authenticate, deleteNotificationController);
export default notificationRouter;
//# sourceMappingURL=notification.router.js.map