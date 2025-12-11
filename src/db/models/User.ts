import { Schema, model, Document } from "mongoose";
import { handleSaveError, setUpdateSettings } from "../hooks.js";
import {
  emailRegexp,
  fullnameRegexp,
  usernameRegexp,
} from "../../constants/auth.constants.js";

export interface UserDocument extends Document {
  fullname: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  about: string;
  website: string;
  accessToken?: string;
  refreshToken?: string;
  followers: number;
  following: number;
  totalPosts: number;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    fullname: {
      type: String,
      required: true,
      match: fullnameRegexp,
      minlength: 3,
      maxlength: 50,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      match: usernameRegexp,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    avatar: {
      type: String,
      default: "",
      trim: true,
    },
    about: {
      type: String,
      default: "",
      trim: true,
      maxlength: 150,
    },
    website: {
      type: String,
      default: "",
      trim: true,
      maxlength: 150,
    },
    followers: { type: Number, default: 0 },
    following: { type: Number, default: 0 },
    totalPosts: { type: Number, default: 0 },
  },
  { versionKey: false, timestamps: true },
);

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", setUpdateSettings);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model<UserDocument>("user", userSchema);

export default User;
