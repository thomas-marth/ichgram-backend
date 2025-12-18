import { deleteNotificationById, getNotificationsForUser, } from "../services/notification.services.js";
import getUserIdFromToken from "../utils/getUserIdFromToken.js";
import HttpError from "../utils/HttpError.js";
export const getNotificationsController = async (req, res) => {
    const userId = getUserIdFromToken(req);
    const notifications = await getNotificationsForUser(userId);
    res.status(200).json(notifications);
};
export const deleteNotificationController = async (req, res) => {
    const { notificationId } = req.params;
    const userId = getUserIdFromToken(req);
    if (!notificationId)
        throw HttpError(400, "Notification ID is required");
    await deleteNotificationById(notificationId, userId);
    res.status(200).json({ message: "Notification deleted" });
};
//# sourceMappingURL=notification.controllers.js.map