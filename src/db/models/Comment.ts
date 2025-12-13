import { Schema, Document, model, Types } from "mongoose";

import { handleSaveError, setUpdateSettings } from "../hooks.js";

export interface CommentDocument extends Document {
  post: Types.ObjectId;
  user: Types.ObjectId;
  text: string;
  likes: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<CommentDocument>(
  {
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
  },
  { versionKey: false, timestamps: true },
);

commentSchema.post("save", handleSaveError);
commentSchema.pre("findOneAndUpdate", setUpdateSettings);
commentSchema.post("findOneAndUpdate", handleSaveError);

const Comment = model<CommentDocument>("comment", commentSchema);

export default Comment;
