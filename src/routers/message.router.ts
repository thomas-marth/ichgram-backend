import { Router, Request, Response, NextFunction } from "express";

import {
  getMessagesWithUserController,
  sendMessageController,
  messagesMiddlewares,
} from "../controllers/message.controllers.js";

const messageRouter: Router = Router();

// Анти-кэш middleware только для GET /with/:userId
const noCache = (req: Request, res: Response, next: NextFunction) => {
  res.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate",
  );
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
};

messageRouter.get(
  "/with/:userId",
  noCache,
  messagesMiddlewares,
  getMessagesWithUserController,
);

messageRouter.post("/", messagesMiddlewares, sendMessageController);

export default messageRouter;
