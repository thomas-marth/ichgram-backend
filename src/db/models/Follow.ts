import { Schema, Document, model, Types } from "mongoose";

import { handleSaveError, setUpdateSettings } from "../hooks.js";

export interface FollowDocument extends Document {
  follower: Types.ObjectId;
  following: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const followSchema = new Schema<FollowDocument>(
  {
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
  },
  { versionKey: false, timestamps: true },
);

followSchema.index({ follower: 1, following: 1 }, { unique: true });

followSchema.post("save", handleSaveError);
followSchema.pre("findOneAndUpdate", setUpdateSettings);
followSchema.post("findOneAndUpdate", handleSaveError);

const Follow = model<FollowDocument>("follow", followSchema);

export default Follow;
