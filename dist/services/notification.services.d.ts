import { Types } from "mongoose";
import { NotificationDocument, NotificationType } from "../db/models/Notification.js";
interface NotificationPayload {
    recipient: Types.ObjectId;
    actor: Types.ObjectId;
    type: NotificationType;
    post?: Types.ObjectId;
    comment?: Types.ObjectId;
}
export declare const createNotification: ({ recipient, actor, type, post, comment, }: NotificationPayload) => Promise<NotificationDocument | null>;
export declare const removeNotification: (payload: NotificationPayload) => Promise<void>;
export declare const getNotificationsForUser: (recipient: Types.ObjectId) => Promise<(import("mongoose").Document<unknown, {}, NotificationDocument, {}, import("mongoose").DefaultSchemaOptions> & NotificationDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
})[]>;
export declare const deleteNotificationById: (notificationId: string, recipient: Types.ObjectId) => Promise<void>;
export {};
//# sourceMappingURL=notification.services.d.ts.map