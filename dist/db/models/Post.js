import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "../hooks.js";
const postSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    description: {
        type: String,
        trim: true,
        default: "",
        maxlength: 2200,
    },
    image: {
        type: String,
        required: true,
        trim: true,
    },
    totalLikes: {
        type: Number,
        default: 0,
    },
    totalComments: {
        type: Number,
        default: 0,
    },
}, {
    versionKey: false,
    timestamps: true,
});
postSchema.post("save", handleSaveError);
postSchema.pre("findOneAndUpdate", setUpdateSettings);
postSchema.post("findOneAndUpdate", handleSaveError);
const Post = model("post", postSchema);
export default Post;
//# sourceMappingURL=Post.js.map