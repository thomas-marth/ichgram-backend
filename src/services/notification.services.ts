import { Types } from "mongoose";

import Notification, {
  NotificationDocument,
  NotificationType,
} from "../db/models/Notification.js";
import HttpError from "../utils/HttpError.js";

const NOTIFICATION_POPULATE_CONFIG = [
  { path: "actor", select: "username avatar" },
  { path: "post", select: "image author" },
  { path: "comment", select: "text post" },
];

interface NotificationPayload {
  recipient: Types.ObjectId;
  actor: Types.ObjectId;
  type: NotificationType;
  post?: Types.ObjectId;
  comment?: Types.ObjectId;
}

export const createNotification = async ({
  recipient,
  actor,
  type,
  post,
  comment,
}: NotificationPayload): Promise<NotificationDocument | null> => {
  if (recipient.toString() === actor.toString()) return null;

  const filter: Record<string, unknown> = { recipient, actor, type };
  if (post) filter.post = post;
  if (comment) filter.comment = comment;

  return Notification.findOneAndUpdate(
    filter,
    { $setOnInsert: filter },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
};

export const removeNotification = async (
  payload: NotificationPayload,
): Promise<void> => {
  const filter: Record<string, unknown> = {
    recipient: payload.recipient,
    actor: payload.actor,
    type: payload.type,
  };

  if (payload.post) filter.post = payload.post;
  if (payload.comment) filter.comment = payload.comment;

  await Notification.findOneAndDelete(filter);
};

export const getNotificationsForUser = async (recipient: Types.ObjectId) =>
  Notification.find({ recipient })
    .sort({ createdAt: -1 })
    .populate(NOTIFICATION_POPULATE_CONFIG);

export const deleteNotificationById = async (
  notificationId: string,
  recipient: Types.ObjectId,
) => {
  const deleted = await Notification.findOneAndDelete({
    _id: notificationId,
    recipient,
  });

  if (!deleted) throw HttpError(404, "Notification not found");
};
