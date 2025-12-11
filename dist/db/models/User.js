import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "../hooks.js";
import { emailRegexp, fullnameRegexp, usernameRegexp, } from "../../constants/auth.constants.js";
const userSchema = new Schema({
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
}, { versionKey: false, timestamps: true });
userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", setUpdateSettings);
userSchema.post("findOneAndUpdate", handleSaveError);
const User = model("user", userSchema);
export default User;
//# sourceMappingURL=User.js.map