import { Types } from "mongoose";

import Follow from "../db/models/Follow.js";
import User from "../db/models/User.js";
import HttpError from "../utils/HttpError.js";
import { uploadBufferToCloudinary } from "../utils/cloudinary.js";

const PUBLIC_USER_FIELDS = "-password -accessToken -refreshToken";

const uploadAvatarToCloudinary = async (fileBuffer: Buffer): Promise<string> =>
  uploadBufferToCloudinary(fileBuffer);

export const getUserProfile = async (
  userId: string,
  viewerId?: Types.ObjectId,
) => {
  if (!Types.ObjectId.isValid(userId)) throw HttpError(400, "Invalid user ID");

  const user = await User.findById(userId).select(PUBLIC_USER_FIELDS).lean();
  if (!user) throw HttpError(404, "User not found");

  const isViewerOwner = viewerId?.toString() === userId;
  const isFollowed = viewerId
    ? Boolean(await Follow.exists({ follower: viewerId, following: userId }))
    : false;

  return { ...user, isFollowed: !isViewerOwner && isFollowed };
};

interface UpdateUserPayload {
  username?: string | undefined;
  fullname?: string | undefined;
  about?: string | undefined;
  website?: string | undefined;
  avatarBuffer?: Buffer | undefined;
}

export const updateUserProfile = async (
  userId: Types.ObjectId,
  { username, fullname, about, website, avatarBuffer }: UpdateUserPayload,
) => {
  const user = await User.findById(userId);
  if (!user) throw HttpError(404, "User not found");

  if (username !== undefined) user.username = username;
  if (fullname !== undefined) user.fullname = fullname;
  if (about !== undefined) user.about = about;
  if (website !== undefined) user.website = website;

  if (avatarBuffer) {
    user.avatar = await uploadAvatarToCloudinary(avatarBuffer);
  }

  await user.save();

  const updatedUser = await User.findById(userId).select(PUBLIC_USER_FIELDS);
  if (!updatedUser) throw HttpError(500, "Failed to load updated user profile");

  return updatedUser;
};

export const getAllUsers = () => User.find().select(PUBLIC_USER_FIELDS);
