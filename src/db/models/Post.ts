import { Schema, Document, model, Types } from "mongoose";
import { handleSaveError, setUpdateSettings } from "../hooks.js";

export interface PostDocument extends Document {
  author: Types.ObjectId;
  description: string;
  image: string;
  totalLikes: number;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<PostDocument>(
  {
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
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

postSchema.post("save", handleSaveError);
postSchema.pre("findOneAndUpdate", setUpdateSettings);
postSchema.post("findOneAndUpdate", handleSaveError);

const Post = model<PostDocument>("post", postSchema);

export default Post;
