import { RequestHandler } from "express";

import {
  addLikeToPost,
  getPostLikes,
  getUserLikedPosts,
  removeLikeFromPost,
} from "../services/like.services.js";
import HttpError from "../utils/HttpError.js";
import getUserIdFromToken from "../utils/getUserIdFromToken.js";
import { AuthRequest } from "../types/interface.js";

export const getPostLikesController: RequestHandler = async (req, res) => {
  const { postId } = req.params;
  if (!postId) throw HttpError(400, "Post ID is required");

  const likes = await getPostLikes(postId);
  res.status(200).json(likes);
};

export const likePostController: RequestHandler = async (req, res) => {
  const { postId } = req.params;
  const userId = getUserIdFromToken(req as AuthRequest);

  if (!postId) throw HttpError(400, "Post ID is required");

  const like = await addLikeToPost(postId, userId);
  res.status(201).json(like);
};

export const unlikePostController: RequestHandler = async (req, res) => {
  const { postId } = req.params;
  const userId = getUserIdFromToken(req as AuthRequest);

  if (!postId) throw HttpError(400, "Post ID is required");

  await removeLikeFromPost(postId, userId);
  res.status(200).json({ message: "Like removed" });
};

export const getUserLikesController: RequestHandler = async (req, res) => {
  const { userId } = req.params;
  if (!userId) throw HttpError(400, "User ID is required");

  const likes = await getUserLikedPosts(userId);
  res.status(200).json(likes);
};
