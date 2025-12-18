import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "../hooks.js";
const messageSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
        index: true,
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
        index: true,
    },
    text: {
        type: String,
        required: true,
        trim: true,
        maxlength: 5000,
    },
    conversationId: {
        type: String,
        required: true,
        index: true,
    },
}, { versionKey: false, timestamps: true });
messageSchema.index({ conversationId: 1, createdAt: 1 });
messageSchema.post("save", handleSaveError);
messageSchema.pre("findOneAndUpdate", setUpdateSettings);
messageSchema.post("findOneAndUpdate", handleSaveError);
const Message = model("message", messageSchema);
export default Message;
//# sourceMappingURL=Message.js.map