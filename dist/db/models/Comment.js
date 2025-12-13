import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "../hooks.js";
const commentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: "post",
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    text: {
        type: String,
        required: true,
        trim: true,
    },
    likes: {
        type: [Schema.Types.ObjectId],
        ref: "user",
        default: [],
    },
}, { versionKey: false, timestamps: true });
commentSchema.post("save", handleSaveError);
commentSchema.pre("findOneAndUpdate", setUpdateSettings);
commentSchema.post("findOneAndUpdate", handleSaveError);
const Comment = model("comment", commentSchema);
export default Comment;
//# sourceMappingURL=Comment.js.map