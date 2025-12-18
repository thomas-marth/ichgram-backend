import { Document, Types } from "mongoose";
export type NotificationType = "like_post" | "comment_post" | "follow" | "like_comment";
export interface NotificationDocument extends Document {
    recipient: Types.ObjectId;
    actor: Types.ObjectId;
    type: NotificationType;
    post?: Types.ObjectId;
    comment?: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
declare const Notification: import("mongoose").Model<NotificationDocument, {}, {}, {}, Document<unknown, {}, NotificationDocument, {}, import("mongoose").DefaultSchemaOptions> & NotificationDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any, NotificationDocument>;
export default Notification;
//# sourceMappingURL=Notification.d.ts.map