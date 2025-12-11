import { Schema, Document, model, Types } from "mongoose";

import { handleSaveError, setUpdateSettings } from "../hooks.js";

export interface LikeDocument extends Document {
  post: Types.ObjectId;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const likeSchema = new Schema<LikeDocument>(
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
  },
  { versionKey: false, timestamps: true },
);

likeSchema.index({ post: 1, user: 1 }, { unique: true });

likeSchema.post("save", handleSaveError);
likeSchema.pre("findOneAndUpdate", setUpdateSettings);
likeSchema.post("findOneAndUpdate", handleSaveError);

const Like = model<LikeDocument>("like", likeSchema);

export default Like;
