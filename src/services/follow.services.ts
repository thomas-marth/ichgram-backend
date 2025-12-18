import { Types } from "mongoose";

import Follow from "../db/models/Follow.js";
import User from "../db/models/User.js";
import HttpError from "../utils/HttpError.js";
import {
  createNotification,
  removeNotification,
} from "./notification.services.js";

const ensureUserExists = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw HttpError(404, "User not found");
  return user;
};

export const getUserFollowers = async (userId: string) => {
  await ensureUserExists(userId);
  return Follow.find({ following: userId }).populate(
    "follower",
    "username avatar fullname",
  );
};

export const getUserFollowing = async (userId: string) => {
  await ensureUserExists(userId);
  return Follow.find({ follower: userId }).populate(
    "following",
    "username avatar fullname",
  );
};

export const followUser = async (
  followerId: Types.ObjectId,
  followingId: string,
) => {
  if (followerId.toString() === followingId)
    throw HttpError(400, "You cannot follow yourself");

  await ensureUserExists(followerId.toString());
  await ensureUserExists(followingId);

  const existingFollow = await Follow.findOne({
    follower: followerId,
    following: followingId,
  });
  if (existingFollow) throw HttpError(409, "Already following this user");

  const follow = await Follow.create({
    user_id: followingId,
    follower: followerId,
    following: followingId,
  });

  await User.findByIdAndUpdate(followerId, { $inc: { following: 1 } });
  await User.findByIdAndUpdate(followingId, { $inc: { followers: 1 } });

  await createNotification({
    recipient: follow.following,
    actor: followerId,
    type: "follow",
  });

  return follow;
};

export const unfollowUser = async (
  followerId: Types.ObjectId,
  followingId: string,
) => {
  const follow = await Follow.findOneAndDelete({
    follower: followerId,
    following: followingId,
  });

  if (!follow) throw HttpError(404, "Follow relationship not found");

  await User.findByIdAndUpdate(followerId, { $inc: { following: -1 } });
  await User.findByIdAndUpdate(followingId, { $inc: { followers: -1 } });

  await removeNotification({
    recipient: follow.following,
    actor: followerId,
    type: "follow",
  });

  return follow;
};
