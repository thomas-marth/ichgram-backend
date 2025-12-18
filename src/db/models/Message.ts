import { Schema, Document, model, Types } from "mongoose";

import { handleSaveError, setUpdateSettings } from "../hooks.js";

export interface MessageDocument extends Document {
  from: Types.ObjectId;
  to: Types.ObjectId;
  text: string;
  conversationId: string;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<MessageDocument>(
  {
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
  },
  { versionKey: false, timestamps: true },
);

messageSchema.index({ conversationId: 1, createdAt: 1 });

messageSchema.post("save", handleSaveError);
messageSchema.pre("findOneAndUpdate", setUpdateSettings);
messageSchema.post("findOneAndUpdate", handleSaveError);

const Message = model<MessageDocument>("message", messageSchema);

export default Message;
