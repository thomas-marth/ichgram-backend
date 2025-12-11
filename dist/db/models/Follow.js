import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "../hooks.js";
const followSchema = new Schema({
    follower: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    following: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
}, { versionKey: false, timestamps: true });
followSchema.index({ follower: 1, following: 1 }, { unique: true });
followSchema.post("save", handleSaveError);
followSchema.pre("findOneAndUpdate", setUpdateSettings);
followSchema.post("findOneAndUpdate", handleSaveError);
const Follow = model("follow", followSchema);
export default Follow;
//# sourceMappingURL=Follow.js.map