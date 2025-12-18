import { RequestHandler } from "express";

import {
  deleteNotificationById,
  getNotificationsForUser,
} from "../services/notification.services.js";
import getUserIdFromToken from "../utils/getUserIdFromToken.js";
import { AuthRequest } from "../types/interface.js";
import HttpError from "../utils/HttpError.js";

export const getNotificationsController: RequestHandler = async (req, res) => {
  const userId = getUserIdFromToken(req as AuthRequest);
  const notifications = await getNotificationsForUser(userId);

  res.status(200).json(notifications);
};

export const deleteNotificationController: RequestHandler = async (
  req,
  res,
) => {
  const { notificationId } = req.params;
  const userId = getUserIdFromToken(req as AuthRequest);

  if (!notificationId) throw HttpError(400, "Notification ID is required");

  await deleteNotificationById(notificationId, userId);

  res.status(200).json({ message: "Notification deleted" });
};
