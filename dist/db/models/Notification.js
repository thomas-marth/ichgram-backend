import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "../hooks.js";
const notificationSchema = new Schema({
    recipient: { type: Schema.Types.ObjectId, ref: "user", required: true },
    actor: { type: Schema.Types.ObjectId, ref: "user", required: true },
    type: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: "post" },
    comment: { type: Schema.Types.ObjectId, ref: "comment" },
}, { versionKey: false, timestamps: true });
notificationSchema.index({ recipient: 1, actor: 1, type: 1, post: 1, comment: 1 }, { unique: true });
notificationSchema.post("save", handleSaveError);
notificationSchema.pre("findOneAndUpdate", setUpdateSettings);
notificationSchema.post("findOneAndUpdate", handleSaveError);
const Notification = model("notification", notificationSchema);
export default Notification;
//# sourceMappingURL=Notification.js.map