import { Router } from "express";
import { getMessagesWithUserController, sendMessageController, messagesMiddlewares, getLastMessagesController, } from "../controllers/message.controllers.js";
const messageRouter = Router();
// Анти-кэш middleware только для GET /with/:userId
const noCache = (req, res, next) => {
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");
    next();
};
messageRouter.get("/with/:userId", noCache, messagesMiddlewares, getMessagesWithUserController);
messageRouter.post("/", messagesMiddlewares, sendMessageController);
messageRouter.get("/last-for-all", messagesMiddlewares, getLastMessagesController);
export default messageRouter;
//# sourceMappingURL=message.router.js.map