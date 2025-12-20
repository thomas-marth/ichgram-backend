import bcrypt from "bcrypt";
import { Types } from "mongoose";
import {
  RegisterPayload,
  LoginPayload,
  // ResetPayload,
} from "../schemas/auth.schema.js";
import User, { UserDocument } from "../db/models/User.js";
import HttpError from "../utils/HttpError.js";
import { verifyToken } from "./../utils/jwt.js";
import createTokens from "../utils/createTokens.js";

export type UserFindResult = UserDocument | null;
export interface LoginResult {
  accessToken: string;
  refreshToken: string;
  user: ReturnType<typeof formatUserResponse>;
}

export const formatUserResponse = (user: UserDocument) => ({
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

type UserQuery = Parameters<(typeof User)["findOne"]>[0];

export const findUser = (query: UserQuery): Promise<UserFindResult> =>
  User.findOne(query);

export const registerUser = async (
  payload: RegisterPayload,
): Promise<UserDocument> => {
  const user: UserFindResult = await findUser({ email: payload.email });

  if (user) throw HttpError(409, "This email is already taken.");

  const username: UserFindResult = await findUser({
    username: payload.username,
  });

  if (username) throw HttpError(409, "This username is already taken.");

  const hashPassword = await bcrypt.hash(payload.password, 10);

  return User.create({ ...payload, password: hashPassword });
};

export const loginUser = async (
  payload: LoginPayload,
): Promise<LoginResult> => {
  const identifier = payload.email.trim().toLowerCase();
  const user: UserFindResult = await findUser({
    $or: [{ username: identifier }, { email: identifier }],
  });

  if (!user) throw HttpError(401, "User not found");

  const passwordCompare: boolean = await bcrypt.compare(
    payload.password,
    user.password,
  );

  if (!passwordCompare) throw HttpError(401, "Password invalid");

  const { accessToken, refreshToken } = createTokens(user._id);

  await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });

  return {
    accessToken,
    refreshToken,
    user: formatUserResponse(user),
  };
};

export const logoutUser = async (userId: Types.ObjectId) => {
  await User.findByIdAndUpdate(userId, {
    accessToken: null,
    refreshToken: null,
  });
};

export const refreshUser = async (
  refreshTokenOld: string,
): Promise<LoginResult> => {
  const { error } = verifyToken(refreshTokenOld);
  if (error) throw HttpError(401, error.message);
  // console.log(refreshTokenOld);
  const user: UserFindResult = await findUser({
    refreshToken: refreshTokenOld,
  });

  if (!user) throw HttpError(401, "User not found");

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
