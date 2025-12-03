import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "../hooks.js";
import { emailRegexp, usernameRegexp } from "../../constants/auth.constants.js";
const userSchema = new Schema({
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
}, { versionKey: false, timestamps: true });
userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", setUpdateSettings);
userSchema.post("findOneAndUpdate", handleSaveError);
const User = model("user", userSchema);
export default User;
//# sourceMappingURL=User.js.map