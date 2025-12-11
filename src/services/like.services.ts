import { Types } from "mongoose";

import Like from "../db/models/Like.js";
import Post from "../db/models/Post.js";
import HttpError from "../utils/HttpError.js";

const ensurePostExists = async (postId: string) => {
  const post = await Post.findById(postId);
  if (!post) throw HttpError(404, "Post not found");
  return post;
};

export const getPostLikes = async (postId: string) => {
  await ensurePostExists(postId);
  return Like.find({ post: postId });
};

export const addLikeToPost = async (postId: string, userId: Types.ObjectId) => {
  await ensurePostExists(postId);

  const existingLike = await Like.findOne({ post: postId, user: userId });
  if (existingLike) throw HttpError(409, "Post already liked");

  const like = await Like.create({ post: postId, user: userId });
  await Post.findByIdAndUpdate(postId, { $inc: { totalLikes: 1 } });

  return like;
};

export const removeLikeFromPost = async (
  postId: string,
  userId: Types.ObjectId,
) => {
  await ensurePostExists(postId);

  const like = await Like.findOneAndDelete({ post: postId, user: userId });
  if (!like) throw HttpError(404, "Like not found");

  await Post.findByIdAndUpdate(postId, { $inc: { totalLikes: -1 } });

  return like;
};

export const getUserLikedPosts = async (userId: string) => {
  const likes = await Like.find({ user: userId }).select("post");
  return likes.map(({ post }) => post);
};
