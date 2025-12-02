import { Schema, model, Document } from "mongoose";
import { handleSaveError, setUpdateSettings } from "../hooks.js";
import { emailRegexp, usernameRegexp } from "../../constants/auth.constants.js";

export interface UserDocument extends Document {
  fullname: string;
  username: string;
  email: string;
  password: string;
  accessToken: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    fullname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      match: usernameRegexp,
      minlength: 3,
      maxlength: 15,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", setUpdateSettings);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model<UserDocument>("user", userSchema);

export default User;
