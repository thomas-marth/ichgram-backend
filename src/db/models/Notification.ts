import { Schema, model, Document, Types } from "mongoose";

import { handleSaveError, setUpdateSettings } from "../hooks.js";

export type NotificationType =
  | "like_post"
  | "comment_post"
  | "follow"
  | "like_comment";

export interface NotificationDocument extends Document {
  recipient: Types.ObjectId;
  actor: Types.ObjectId;
  type: NotificationType;
  post?: Types.ObjectId;
  comment?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<NotificationDocument>(
  {
    recipient: { type: Schema.Types.ObjectId, ref: "user", required: true },
    actor: { type: Schema.Types.ObjectId, ref: "user", required: true },
    type: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: "post" },
    comment: { type: Schema.Types.ObjectId, ref: "comment" },
  },
  { versionKey: false, timestamps: true },
);

notificationSchema.index(
  { recipient: 1, actor: 1, type: 1, post: 1, comment: 1 },
  { unique: true },
);

notificationSchema.post("save", handleSaveError);
notificationSchema.pre("findOneAndUpdate", setUpdateSettings);
notificationSchema.post("findOneAndUpdate", handleSaveError);

const Notification = model<NotificationDocument>(
  "notification",
  notificationSchema,
);

export default Notification;
