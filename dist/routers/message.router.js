import { Router } from "express";
import { getMessagesWithUserController, sendMessageController, messagesMiddlewares, } from "../controllers/message.controllers.js";
const messageRouter = Router();
messageRouter.get("/with/:userId", messagesMiddlewares, getMessagesWithUserController);
messageRouter.post("/", messagesMiddlewares, sendMessageController);
export default messageRouter;
//# sourceMappingURL=message.router.js.map