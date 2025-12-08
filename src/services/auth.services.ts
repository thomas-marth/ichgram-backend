import bcrypt from "bcrypt";
import { Types } from "mongoose";
import {
  RegisterPayload,
  LoginPayload,
  // ResetPayload,
} from "../schemas/auth.schema.js";
import User, { UserDocument } from "../db/models/User.js";
import HttpError from "../utils/HttpError.js";
import { generateToken } from "./../utils/jwt.js";
// import { email } from "zod";

export type UserFindResult = UserDocument | null;
export interface LoginResult {
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    username: string;
  };
}

export const createTokens = (id: Types.ObjectId) => {
  const accessToken: string = generateToken({ id }, { expiresIn: "15m" });

  const refreshToken: string = generateToken(
    { id },
    {
      expiresIn: "7d",
    },
  );
  return {
    accessToken,
    refreshToken,
  };
};

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
  const identifier = payload.email;
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
    user: {
      email: user.email,
      username: user.username,
    },
  };
};

export const logoutUser = async (userId: Types.ObjectId) => {
  await User.findByIdAndUpdate(userId, {
    accessToken: "",
    refreshToken: "",
  });
};

// export const resetPassword = async (payload: ResetPayload) => {};
