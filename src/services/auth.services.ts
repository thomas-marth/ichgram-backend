import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  RegisterPayload,
  LoginPayload,
  ResetPayload,
} from "../schemas/auth.schema.js";
import User, { UserDocument } from "../db/models/User.js";
import HttpError from "../utils/HttpError.js";

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET not define in environment variables");
}

type UserFindResult = UserDocument | null;

export interface LoginResult {
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    username: string;
  };
}

export const registerUser = async (
  payload: RegisterPayload,
): Promise<UserDocument> => {
  const user: UserFindResult = await User.findOne({ email: payload.email });

  if (user) throw HttpError(409, "Email already exist");

  const username: UserFindResult = await User.findOne({
    username: payload.username,
  });

  if (username) throw HttpError(409, "Username already exist");

  const hashPassword = await bcrypt.hash(payload.password, 10);

  return User.create({ ...payload, password: hashPassword });
};

export const loginUser = async (
  payload: LoginPayload,
): Promise<LoginResult> => {
  const user: UserFindResult = await User.findOne({
    $or: [{ username: payload.username }, { email: payload.email }],
  });

  if (!user) throw HttpError(401, "User not found");

  const passwordCompare: boolean = await bcrypt.compare(
    payload.password,
    user.password,
  );

  if (!passwordCompare) throw HttpError(401, "Password invalid");

  const tokenPayload = {
    id: user._id,
  };

  const accessToken: string = jwt.sign(tokenPayload, JWT_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken: string = jwt.sign(tokenPayload, JWT_SECRET, {
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

export const resetPassword = async (payload: ResetPayload) => {};
