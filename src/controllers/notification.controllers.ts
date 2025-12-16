import { RequestHandler } from "express";

import { getNotificationsForUser } from "../services/notification.services.js";
import getUserIdFromToken from "../utils/getUserIdFromToken.js";
import { AuthRequest } from "../types/interface.js";

export const getNotificationsController: RequestHandler = async (req, res) => {
  const userId = getUserIdFromToken(req as AuthRequest);
  const notifications = await getNotificationsForUser(userId);

  res.status(200).json(notifications);
};
