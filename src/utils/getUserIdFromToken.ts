import { Types } from "mongoose";
import { AuthRequest } from "../types/interface.js";
import HttpError from "./HttpError.js";
import { verifyToken } from "./jwt.js";

const extractAuthorizationToken = (authorization?: string): string => {
  if (!authorization) throw HttpError(401, "Authorization header missing");

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer")
    throw HttpError(401, "authorization header must have type Bearer");
  if (!token) throw HttpError(401, "authorization header must have token");

  return token;
};

const getUserIdFromToken = (req: AuthRequest): Types.ObjectId => {
  if (req.user?._id) return req.user._id;

  const token = extractAuthorizationToken(req.get("Authorization"));
  const { data: payload, error } = verifyToken(token);

  if (error && error.message === "jwt expired")
    throw HttpError(401, "accessToken expired");
  if (error) throw HttpError(401, error.message);
  if (!payload) throw HttpError(401, "JWT payload not found");

  return new Types.ObjectId(payload.id);
};

export default getUserIdFromToken;
