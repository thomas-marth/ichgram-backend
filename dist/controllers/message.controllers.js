import authenticate from "../middlewares/authenticate.js";
import { createMessage, formatMessageResponse, getMessagesWithUser, getLastMessagesForUser, } from "../services/message.services.js";
import HttpError from "../utils/HttpError.js";
export const getMessagesWithUserController = async (req, res) => {
    const authRequest = req;
    if (!authRequest.user)
        throw HttpError(401, "User not authenticated");
    const targetUserId = req.params.userId;
    if (!targetUserId)
        throw HttpError(400, "Target user id is required");
    const messages = await getMessagesWithUser(authRequest.user._id.toString(), targetUserId);
    res.json(messages.map(formatMessageResponse));
};
export const sendMessageController = async (req, res) => {
    const authRequest = req;
    if (!authRequest.user)
        throw HttpError(401, "User not authenticated");
    const { to, text } = req.body || {};
    if (!to || typeof text !== "string")
        throw HttpError(400, "Invalid payload");
    const message = await createMessage(authRequest.user._id.toString(), to, text);
    res.status(201).json(formatMessageResponse(message));
};
export const getLastMessagesController = async (req, res) => {
    const auth = req;
    if (!auth.user)
        throw HttpError(401, "User not authenticated");
    const data = await getLastMessagesForUser(auth.user._id.toString());
    res.json(data);
};
export const messagesMiddlewares = [authenticate];
//# sourceMappingURL=message.controllers.js.map