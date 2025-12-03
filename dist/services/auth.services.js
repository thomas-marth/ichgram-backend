import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../db/models/User.js";
import HttpError from "../utils/HttpError.js";
const { JWT_SECRET } = process.env;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET not define in environment variables");
}
export const registerUser = async (payload) => {
    const user = await User.findOne({ email: payload.email });
    if (user)
        throw HttpError(409, "This email is already taken.");
    const username = await User.findOne({
        username: payload.username,
    });
    if (username)
        throw HttpError(409, "This username is already taken.");
    const hashPassword = await bcrypt.hash(payload.password, 10);
    return User.create({ ...payload, password: hashPassword });
};
export const loginUser = async (payload) => {
    const user = await User.findOne({
        $or: [{ username: payload.username }, { email: payload.email }],
    });
    if (!user)
        throw HttpError(401, "User not found");
    const passwordCompare = await bcrypt.compare(payload.password, user.password);
    if (!passwordCompare)
        throw HttpError(401, "Password invalid");
    const tokenPayload = {
        id: user._id,
    };
    const accessToken = jwt.sign(tokenPayload, JWT_SECRET, {
        expiresIn: "15m",
    });
    const refreshToken = jwt.sign(tokenPayload, JWT_SECRET, {
        expiresIn: "7d",
    });
    return {
        accessToken,
        refreshToken,
        user: {
            email: user.email,
            username: user.username,
        },
    };
};
// export const resetPassword = async (payload: ResetPayload) => {};
//# sourceMappingURL=auth.services.js.map