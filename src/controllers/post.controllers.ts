import { RequestHandler } from "express";
import multer from "multer";

import validateBody from "../utils/validateBody.js";
import {
  createPost,
  deletePost,
  getCurrentUserPosts,
  getExplorePosts,
  getFollowingFeedPosts,
  getPostById,
  getPostsByUserId,
  updatePost,
} from "../services/post.services.js";
import HttpError from "../utils/HttpError.js";
import getUserIdFromToken from "../utils/getUserIdFromToken.js";
import { postUpdateSchema } from "../schemas/post.schema.js";
import { AuthRequest } from "../types/interface.js";

type PostRequest = AuthRequest & { file?: Express.Multer.File };

const storage = multer.memoryStorage();
export const upload = multer({ storage });

const getOptionalUserId = (req: AuthRequest) =>
  req.get("Authorization") ? getUserIdFromToken(req) : undefined;

export const getCurrentUserPostsController: RequestHandler = async (
  req,
  res,
) => {
  const userId = getUserIdFromToken(req as AuthRequest);
  const posts = await getCurrentUserPosts(userId);

  res.status(200).json(posts);
};

export const createPostController: RequestHandler = async (req, res) => {
  const typedReq = req as PostRequest;
  const userId = getUserIdFromToken(typedReq);
  const { description = "" } = typedReq.body as { description?: string };

  if (!typedReq.file) throw HttpError(400, "Image is required");

  const post = await createPost(userId, description, typedReq.file.buffer);

  res.status(201).json(post);
};

export const deletePostController: RequestHandler = async (req, res) => {
  const { postId } = req.params;
  const userId = getUserIdFromToken(req as AuthRequest);

  if (!postId) throw HttpError(400, "Post ID is required");

  await deletePost(postId, userId);

  res.status(200).json({ message: "Post deleted" });
};

export const getPostByIdController: RequestHandler = async (req, res) => {
  const { postId } = req.params;
  if (!postId) throw HttpError(400, "Post ID is required");

  const post = await getPostById(postId);

  res.status(200).json(post);
};

export const updatePostController: RequestHandler = async (req, res) => {
  const { postId } = req.params;
  const typedReq = req as PostRequest;
  const userId = getUserIdFromToken(typedReq);

  if (!postId) throw HttpError(400, "Post ID is required");

  const { description } = validateBody(postUpdateSchema, {
    description: typedReq.body.description,
    image: typedReq.file ? "image" : undefined,
  });

  const updatedPost = await updatePost(
    postId,
    userId,
    description,
    typedReq.file?.buffer,
  );

  res.status(200).json(updatedPost);
};

export const getExplorePostsController: RequestHandler = async (req, res) => {
  const userId = getOptionalUserId(req as AuthRequest);
  const posts = await getExplorePosts(userId);

  res.status(200).json(posts);
};

export const getPostsByUserIdController: RequestHandler = async (req, res) => {
  const { userId } = req.params;
  if (!userId) throw HttpError(400, "User ID is required");

  const posts = await getPostsByUserId(userId);

  res.status(200).json(posts);
};

export const getFollowingFeedController: RequestHandler = async (req, res) => {
  const userId = getUserIdFromToken(req);
  const posts = await getFollowingFeedPosts(userId);

  res.status(200).json(posts);
};
