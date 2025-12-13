import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "../hooks.js";
const likeSchema = new Schema({
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
}, { versionKey: false, timestamps: true });
likeSchema.index({ post: 1, user: 1 }, { unique: true });
likeSchema.post("save", handleSaveError);
likeSchema.pre("findOneAndUpdate", setUpdateSettings);
likeSchema.post("findOneAndUpdate", handleSaveError);
const Like = model("like", likeSchema);
export default Like;
//# sourceMappingURL=Like.js.map