import { RequestHandler } from "express";

import {
  createComment,
  deleteComment,
  getPostComments,
  toggleCommentLike,
} from "../services/comment.services.js";
import HttpError from "../utils/HttpError.js";
import getUserIdFromToken from "../utils/getUserIdFromToken.js";
import { AuthRequest } from "../types/interface.js";

export const getPostCommentsController: RequestHandler = async (req, res) => {
  const { postId } = req.params;
  if (!postId) throw HttpError(400, "Post ID is required");

  const comments = await getPostComments(postId);
  res.status(200).json(comments);
};

export const createCommentController: RequestHandler = async (req, res) => {
  const { postId } = req.params;
  const userId = getUserIdFromToken(req as AuthRequest);
  const { text } = req.body as { text?: string };

  if (!postId) throw HttpError(400, "Post ID is required");
  if (!text || !text.trim()) throw HttpError(400, "Comment text is required");

  const comment = await createComment(postId, userId, text.trim());
  res.status(201).json(comment);
};

export const deleteCommentController: RequestHandler = async (req, res) => {
  const { commentId } = req.params;
  const userId = getUserIdFromToken(req as AuthRequest);

  if (!commentId) throw HttpError(400, "Comment ID is required");

  await deleteComment(commentId, userId);
  res.status(200).json({ message: "Comment deleted" });
};

export const toggleCommentLikeController: RequestHandler = async (req, res) => {
  const { commentId } = req.params;
  const userId = getUserIdFromToken(req as AuthRequest);

  if (!commentId) throw HttpError(400, "Comment ID is required");

  const { comment, isLiked } = await toggleCommentLike(commentId, userId);
  res.status(200).json({
    _id: comment._id,
    likesCount: comment.likes.length,
    isLiked,
  });
};
