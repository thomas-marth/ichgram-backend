import bcrypt from "bcrypt";
import User from "../db/models/User.js";
import HttpError from "../utils/HttpError.js";
import { generateToken } from "./../utils/jwt.js";
export const createTokens = (id) => {
    const accessToken = generateToken({ id }, { expiresIn: "15m" });
    const refreshToken = generateToken({ id }, {
        expiresIn: "7d",
    });
    return {
        accessToken,
        refreshToken,
    };
};
//@ts-expect-error
export const findUser = (query) => User.findOne(query);
export const registerUser = async (payload) => {
    const user = await findUser({ email: payload.email });
    if (user)
        throw HttpError(409, "This email is already taken.");
    const username = await findUser({
        username: payload.username,
    });
    if (username)
        throw HttpError(409, "This username is already taken.");
    const hashPassword = await bcrypt.hash(payload.password, 10);
    return User.create({ ...payload, password: hashPassword });
};
export const loginUser = async (payload) => {
    const identifier = payload.email;
    const user = await findUser({
        $or: [{ username: identifier }, { email: identifier }],
    });
    if (!user)
        throw HttpError(401, "User not found");
    const passwordCompare = await bcrypt.compare(payload.password, user.password);
    if (!passwordCompare)
        throw HttpError(401, "Password invalid");
    const { accessToken, refreshToken } = createTokens(user._id);
    await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });
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