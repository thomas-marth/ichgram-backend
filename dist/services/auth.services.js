import bcrypt from "bcrypt";
import User from "../db/models/User.js";
import HttpError from "../utils/HttpError.js";
import { verifyToken } from "./../utils/jwt.js";
import createTokens from "../utils/createTokens.js";
export const formatUserResponse = (user) => ({
    id: user._id.toString(),
    username: user.username,
    fullname: user.fullname,
    email: user.email,
    avatar: user.avatar,
    about: user.about,
    website: user.website,
    followers: user.followers,
    following: user.following,
    totalPosts: user.totalPosts,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
});
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
        user: formatUserResponse(user),
    };
};
export const logoutUser = async (userId) => {
    await User.findByIdAndUpdate(userId, {
        accessToken: null,
        refreshToken: null,
    });
};
export const refreshUser = async (refreshTokenOld) => {
    const { error } = verifyToken(refreshTokenOld);
    if (error)
        throw HttpError(401, error.message);
    // console.log(refreshTokenOld);
    const user = await findUser({
        refreshToken: refreshTokenOld,
    });
    if (!user)
        throw HttpError(401, "User not found");
    const { accessToken, refreshToken } = createTokens(user._id);
    await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });
    console.log(refreshToken);
    return {
        accessToken,
        refreshToken,
        user: formatUserResponse(user),
    };
};
// export const resetPassword = async (payload: ResetPayload) => {};
//# sourceMappingURL=auth.services.js.map