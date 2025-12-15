import { RequestHandler } from "express";
import multer from "multer";

import getUserIdFromToken from "../utils/getUserIdFromToken.js";
import HttpError from "../utils/HttpError.js";
import {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
} from "../services/user.services.js";
import { AuthRequest } from "../types/interface.js";

type UserRequest = AuthRequest & { file?: Express.Multer.File };

const storage = multer.memoryStorage();
export const uploadProfileImage = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const getUserProfileController: RequestHandler = async (req, res) => {
  const { userId } = req.params;
  if (!userId) throw HttpError(400, "User ID is required");

  const viewerId = req.get("Authorization")
    ? getUserIdFromToken(req as AuthRequest)
    : undefined;

  const user = await getUserProfile(userId, viewerId);

  res.status(200).json(user);
};

export const updateUserProfileController: RequestHandler = async (req, res) => {
  const typedReq = req as UserRequest;
  const userId = getUserIdFromToken(typedReq);

  const { username, fullname, about, website } = typedReq.body as {
    username?: string;
    fullname?: string;
    about?: string;
    website?: string;
  };

  const updatedUser = await updateUserProfile(userId, {
    username,
    fullname,
    about,
    website,
    avatarBuffer: typedReq.file?.buffer,
  });

  res.status(200).json(updatedUser);
};

export const getAllUsersController: RequestHandler = async (req, res) => {
  const users = await getAllUsers();

  res.status(200).json(users);
};
