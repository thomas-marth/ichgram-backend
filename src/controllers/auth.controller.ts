import { Request, Response, RequestHandler } from "express";
import validateBody from "./../utils/validateBody.js";
import {
  registerUser,
  loginUser,
  // resetPassword,
} from "./../services/auth.services.js";
import {
  registerSchema,
  loginSchema,
  // resetSchema,
} from "./../schemas/auth.schema.js";

export const registerController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  validateBody(registerSchema, req.body);
  await registerUser(req.body);

  res.status(201).json({ message: "User register successfully" });
};

export const loginController: RequestHandler = async (req, res) => {
  validateBody(loginSchema, req.body);
  const result = await loginUser(req.body);
};
